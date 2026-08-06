"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/molecules/reveal";
import { Badge } from "@/components/atoms/badge";
import { cn, formatPrice } from "@/lib/utils";
import {
  categories,
  products,
  getLocalized,
  getProductsByCategory,
} from "@/data/catalog";

export function ProductsCatalog() {
  const t = useTranslations("categories");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products;
    const category = categories.find((c) => c.slug === activeCategory);
    if (!category) return products;
    return getProductsByCategory(category.id);
  }, [activeCategory]);

  return (
    <>
      <Reveal className="mb-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full border px-5 py-2.5 text-sm transition",
            !activeCategory
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-muted-foreground hover:border-foreground/30",
          )}
        >
          {tc("all")}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm transition",
              activeCategory === category.slug
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground hover:border-foreground/30",
            )}
          >
            {getLocalized(category.name, locale)}
          </button>
        ))}
      </Reveal>

      <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((category, i) => (
          <Reveal key={category.id} delay={i * 0.06}>
            <button
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className="group relative w-full overflow-hidden rounded-3xl text-left shadow-soft transition hover:shadow-[0_24px_64px_rgba(17,24,39,0.12)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.image}
                  alt={getLocalized(category.name, locale)}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="display text-base text-white md:text-lg">
                    {getLocalized(category.name, locale)}
                  </h3>
                  <p className="mt-1 text-xs text-white/70">
                    {category.productCount} {t("viewAll").toLowerCase()}
                  </p>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal className="mb-8">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} {tc("view").toLowerCase()}
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.05}>
            <Link
              href={`/products/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition hover:shadow-[0_24px_64px_rgba(17,24,39,0.12)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={getLocalized(product.name, locale)}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {product.featured && (
                  <Badge className="absolute left-4 top-4 border-white/20 bg-background/80 backdrop-blur">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {product.sku}
                </p>
                <h3 className="display text-lg text-foreground md:text-xl">
                  {getLocalized(product.name, locale)}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {getLocalized(product.description, locale)}
                </p>
                <p className="mt-auto pt-4 text-sm font-medium text-foreground">
                  {formatPrice(product.price, locale)}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/molecules/reveal";
import { Badge } from "@/components/atoms/badge";
import { formatPrice } from "@/lib/utils";
import {
  getLocalized,
  getProductsByCategory,
} from "@/data/catalog";
import type { ProductCategory } from "@/types";

export function CategoryDetailContent({
  category,
}: {
  category: ProductCategory;
}) {
  const locale = useLocale();
  const t = useTranslations("categories");
  const tp = useTranslations("product");
  const products = getProductsByCategory(category.id);

  return (
    <div>
      <Reveal className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <Badge className="mb-4">{t("title")}</Badge>
          <h1 className="display text-4xl text-foreground md:text-5xl lg:text-6xl">
            {getLocalized(category.name, locale)}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {getLocalized(category.description, locale)}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {products.length} {t("viewAll").toLowerCase()}
          </p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-soft">
          <Image
            src={category.image}
            alt={getLocalized(category.name, locale)}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
      </Reveal>

      {products.length === 0 ? (
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
            {tp("related")}
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.05}>
              <Link
                href={`/products/${product.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition hover:shadow-[0_24px_64px_rgba(17,24,39,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={getLocalized(product.name, locale)}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {product.sku}
                  </p>
                  <h2 className="display text-lg text-foreground md:text-xl">
                    {getLocalized(product.name, locale)}
                  </h2>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {getLocalized(product.description, locale)}
                  </p>
                  <p className="mt-auto pt-4 text-sm font-medium">
                    {formatPrice(product.price, locale)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

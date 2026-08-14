"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/molecules/reveal";
import { ProductCardGrid } from "@/components/molecules/product-card";
import { Badge } from "@/components/atoms/badge";
import { getLocalized } from "@/data/catalog";
import { useProducts } from "@/hooks/use-catalog";
import type { ProductCategory } from "@/types";

export function CategoryDetailContent({
  category,
}: {
  category: ProductCategory;
}) {
  const locale = useLocale();
  const t = useTranslations("categories");
  const tp = useTranslations("product");
  const { data: allProducts = [] } = useProducts();
  const products = allProducts.filter((p) => p.categoryId === category.id);

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
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#ecece8]">
          <Image
            src={category.image}
            alt={getLocalized(category.name, locale)}
            fill
            quality={95}
            className="object-cover object-center"
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
        <ProductCardGrid products={products} />
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/molecules/reveal";
import { categories, getLocalized } from "@/data/catalog";

export function CategoriesSection() {
  const t = useTranslations("categories");
  const locale = useLocale();

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-wide px-4 md:px-8">
        <Reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="display text-3xl text-foreground md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground transition hover:text-accent"
          >
            {t("viewAll")}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.08}>
              <Link
                href={`/products/${category.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition hover:shadow-[0_24px_64px_rgba(17,24,39,0.12)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={getLocalized(category.name, locale)}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                  <div>
                    <h3 className="display text-lg text-foreground md:text-xl">
                      {getLocalized(category.name, locale)}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {getLocalized(category.description, locale)}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-4 flex h-9 w-9 items-center justify-center self-end rounded-full border border-border bg-background/80 transition group-hover:border-accent group-hover:text-accent"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

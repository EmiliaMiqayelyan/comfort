"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Download, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/atoms/button";
import { Reveal } from "@/components/molecules/reveal";
import { siteImages } from "@/data/catalog";

export function CatalogCta() {
  const hero = useTranslations("hero");
  const downloads = useTranslations("downloads");
  const nav = useTranslations("nav");

  return (
    <section className="bg-secondary/50 py-20 md:py-28">
      <div className="container-wide px-4 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-card shadow-soft">
            <div className="grid lg:grid-cols-2">
              <div className="relative hidden aspect-[4/3] lg:block">
                <Image
                  src={siteImages.catalog}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80" />
              </div>

              <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16 lg:px-16">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-accent">
                  {downloads("catalogs")}
                </p>
                <h2 className="display mt-4 text-balance text-3xl text-foreground md:text-4xl">
                  {downloads("title")}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                  {downloads("subtitle")}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="accent" size="lg">
                    <Link href="/downloads">
                      <Download />
                      {hero("downloadCatalog")}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                      {hero("requestSamples")}
                      <ArrowUpRight />
                    </Link>
                  </Button>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  {nav("requestCatalog")}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

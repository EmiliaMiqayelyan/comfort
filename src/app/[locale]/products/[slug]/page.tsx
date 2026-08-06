import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ProductDetailContent } from "@/features/products/product-detail-content";
import {
  products,
  getProductBySlug,
  getLocalized,
} from "@/data/catalog";
import { routing } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product — Comfort" };

  const name = getLocalized(product.name, locale);
  const description = getLocalized(product.description, locale);

  return {
    title: `${name} — Comfort`,
    description,
    alternates: {
      canonical: `https://comfort.am/${locale}/products/${slug}`,
      languages: {
        am: `https://comfort.am/am/products/${slug}`,
        ru: `https://comfort.am/ru/products/${slug}`,
        en: `https://comfort.am/en/products/${slug}`,
      },
    },
    openGraph: {
      title: name,
      description,
      url: `https://comfort.am/${locale}/products/${slug}`,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
      locale,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-wide px-4 md:px-8">
        <Link
          href="/products"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {tc("back")}
        </Link>
        <ProductDetailContent product={product} />
      </div>
    </section>
  );
}

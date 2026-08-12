import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/molecules/reveal";
import { ProductCardGrid } from "@/components/molecules/product-card";
import { Badge } from "@/components/atoms/badge";
import { projects, getLocalized } from "@/data/catalog";
import { loadProject, loadProducts } from "@/lib/catalog-source";
import { routing } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await loadProject(slug);
  if (!project) return { title: "Project — Comfort" };

  const title = getLocalized(project.title, locale);
  const description = getLocalized(project.description, locale);

  return {
    title: `${title} — Comfort`,
    description,
    alternates: {
      canonical: `https://comfort.am/${locale}/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: project.images[0] }],
      locale,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await loadProject(slug);
  if (!project) notFound();

  const allProducts = await loadProducts();
  const usedProducts = allProducts.filter((p) => project.products.includes(p.id));
  const t = await getTranslations({ locale, namespace: "projects" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-wide px-4 md:px-8">
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {tc("back")}
        </Link>

        <Reveal className="mb-12 max-w-4xl">
          <Badge className="mb-4 capitalize">{project.category}</Badge>
          <h1 className="display text-4xl text-foreground md:text-5xl lg:text-6xl">
            {getLocalized(project.title, locale)}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {getLocalized(project.description, locale)}
          </p>
          <dl className="mt-8 flex flex-wrap gap-8 text-sm">
            <div>
              <dt className="text-muted-foreground">{t("location")}</dt>
              <dd className="mt-1 font-medium text-foreground">
                {getLocalized(project.location, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{t("year")}</dt>
              <dd className="mt-1 font-medium text-foreground">{project.year}</dd>
            </div>
          </dl>
        </Reveal>

        {project.beforeImage && project.afterImage && (
          <Reveal className="mb-16">
            <h2 className="display mb-8 text-2xl text-foreground md:text-3xl">
              {t("beforeAfter")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Before
                </p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
                  <Image
                    src={project.beforeImage}
                    alt="Before"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  After
                </p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
                  <Image
                    src={project.afterImage}
                    alt="After"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.images.map((img, i) => (
            <Reveal key={img} delay={i * 0.06}>
              <div
                className={`relative overflow-hidden rounded-3xl shadow-soft ${
                  i === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img}
                  alt={getLocalized(project.title, locale)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {usedProducts.length > 0 && (
          <div className="mt-24 border-t border-border pt-24">
            <Reveal>
              <h2 className="display mb-12 text-2xl text-foreground md:text-3xl">
                {t("usedProducts")}
              </h2>
            </Reveal>
            <ProductCardGrid products={usedProducts} />
          </div>
        )}
      </div>
    </section>
  );
}

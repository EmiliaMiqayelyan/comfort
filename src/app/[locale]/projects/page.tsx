import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/molecules/reveal";
import { Badge } from "@/components/atoms/badge";
import { getLocalized } from "@/data/catalog";
import { loadProjects } from "@/lib/catalog-source";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("projectsTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `https://comfort.am/${locale}/projects`,
      languages: {
        am: "https://comfort.am/am/projects",
        ru: "https://comfort.am/ru/projects",
        en: "https://comfort.am/en/projects",
      },
    },
    openGraph: {
      title: t("projectsTitle"),
      url: `https://comfort.am/${locale}/projects`,
      locale,
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const projects = await loadProjects();

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-wide px-4 md:px-8">
        <Reveal className="mb-16 max-w-3xl">
          <h1 className="display text-4xl text-foreground md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08} className="mb-6 break-inside-avoid">
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block overflow-hidden rounded-3xl shadow-soft transition hover:shadow-[0_24px_64px_rgba(17,24,39,0.12)]"
              >
                <div
                  className={`relative overflow-hidden ${
                    i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={project.images[0]}
                    alt={getLocalized(project.title, locale)}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <Badge className="mb-3 border-white/20 bg-background/80 capitalize backdrop-blur">
                      {project.category}
                    </Badge>
                    <h2 className="display text-xl text-white md:text-2xl">
                      {getLocalized(project.title, locale)}
                    </h2>
                    <p className="mt-2 text-sm text-white/70">
                      {getLocalized(project.location, locale)} · {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

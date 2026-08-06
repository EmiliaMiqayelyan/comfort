import { getTranslations } from "next-intl/server";
import { Globe, Share2, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/atoms/separator";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="border-t border-border bg-comfort-ink text-comfort-sand">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/40 text-accent">
              C
            </span>
            <span className="display tracking-[0.28em] uppercase">Comfort</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-comfort-sand/65">
            {t("mission")}
          </p>
          <div className="mt-6 flex gap-3">
            {[Share2, Globe, ExternalLink].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-comfort-sand/70 transition hover:border-accent hover:text-accent"
                aria-label="Social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
          <FooterCol title={t("products")}>
            <Link href="/products">{nav("products")}</Link>
            <Link href="/collections">{nav("collections")}</Link>
            <Link href="/configurator">{nav("configurator")}</Link>
            <Link href="/visualizer">{nav("visualizer")}</Link>
          </FooterCol>
          <FooterCol title={t("company")}>
            <Link href="/about">{nav("about")}</Link>
            <Link href="/projects">{nav("projects")}</Link>
            <Link href="/partners">{nav("partners")}</Link>
            <Link href="/blog">{nav("blog")}</Link>
          </FooterCol>
          <FooterCol title={t("support")}>
            <Link href="/downloads">{nav("downloads")}</Link>
            <Link href="/calculator">{nav("calculator")}</Link>
            <Link href="/contact">{nav("contact")}</Link>
            <Link href="/ar">AR</Link>
          </FooterCol>
          <FooterCol title={t("legal")}>
            <Link href="/legal/privacy">{t("privacy")}</Link>
            <Link href="/legal/terms">{t("terms")}</Link>
            <Link href="/legal/cookies">{t("cookies")}</Link>
          </FooterCol>
        </div>
      </div>

      <Separator className="bg-white/10" />
      <div className="container-wide flex flex-col gap-2 py-6 text-xs text-comfort-sand/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Comfort. {t("rights")}</p>
        <p>comfort.am</p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
        {title}
      </h3>
      <div className="flex flex-col gap-3 text-sm text-comfort-sand/70 [&_a]:transition hover:[&_a]:text-white">
        {children}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/molecules/reveal";
import { ContactForm } from "@/features/contact/contact-form";
import { MapPin, Clock, MessageCircle } from "lucide-react";

const SHOWROOMS = [
  {
    id: "yerevan",
    name: "Yerevan Showroom",
    address: "15 Northern Ave, Yerevan, Armenia",
    hours: "Mon–Sat 10:00–19:00",
  },
  {
    id: "moscow",
    name: "Moscow Studio",
    address: "42 Design District, Moscow, Russia",
    hours: "Mon–Fri 10:00–18:00",
  },
];

const MESSENGERS = [
  { id: "whatsapp", labelKey: "whatsapp" as const, href: "https://wa.me/37400000000" },
  { id: "telegram", labelKey: "telegram" as const, href: "https://t.me/comfort" },
  { id: "viber", labelKey: "viber" as const, href: "viber://chat?number=37400000000" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("contactTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `https://comfort.am/${locale}/contact`,
      languages: {
        am: "https://comfort.am/am/contact",
        ru: "https://comfort.am/ru/contact",
        en: "https://comfort.am/en/contact",
      },
    },
    openGraph: {
      title: t("contactTitle"),
      url: `https://comfort.am/${locale}/contact`,
      locale,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

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

        <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-12 lg:col-span-2">
            <Reveal>
              <h2 className="display mb-6 text-xl text-foreground md:text-2xl">
                {t("showrooms")}
              </h2>
              <ul className="space-y-6">
                {SHOWROOMS.map((room) => (
                  <li
                    key={room.id}
                    className="rounded-3xl border border-border bg-card p-6 shadow-soft"
                  >
                    <h3 className="font-medium text-foreground">{room.name}</h3>
                    <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      {room.address}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      {room.hours}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="display mb-6 text-xl text-foreground md:text-2xl">
                {t("factory")}
              </h2>
              <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-dashed border-border bg-muted/40">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Map placeholder
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="display mb-4 text-xl text-foreground">
                {t("whatsapp")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {MESSENGERS.map((m) => (
                  <a
                    key={m.id}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm transition hover:border-foreground/30 hover:shadow-soft"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t(m.labelKey)}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

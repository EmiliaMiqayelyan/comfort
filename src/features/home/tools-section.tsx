"use client";

import { useTranslations } from "next-intl";
import {
  Calculator,
  Palette,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/molecules/reveal";

const tools = [
  {
    key: "calculator" as const,
    href: "/calculator",
    icon: Calculator,
    descKey: "calculator" as const,
  },
  {
    key: "visualizer" as const,
    href: "/visualizer",
    icon: Palette,
    descKey: "visualizer" as const,
  },
  {
    key: "configurator" as const,
    href: "/configurator",
    icon: SlidersHorizontal,
    descKey: "configurator" as const,
  },
];

export function ToolsSection() {
  const nav = useTranslations("nav");
  const calc = useTranslations("calculator");
  const vis = useTranslations("visualizer");
  const conf = useTranslations("configurator");

  const subtitles: Record<(typeof tools)[number]["descKey"], string> = {
    calculator: calc("subtitle"),
    visualizer: vis("subtitle"),
    configurator: conf("subtitle"),
  };

  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container-comfort px-4 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {tools.map(({ key, href, icon: Icon, descKey }, i) => (
            <Reveal key={key} delay={i * 0.1}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition hover:border-accent/40 hover:shadow-[0_24px_64px_rgba(17,24,39,0.1)]"
              >
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="display text-xl text-foreground">
                  {nav(key)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {subtitles[descKey]}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition group-hover:gap-3">
                  {nav(key)}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

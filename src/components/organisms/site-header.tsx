"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Menu, Moon, Search, Sun, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { locales, localeNames, type AppLocale } from "@/i18n/config";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores";

const navKeys = [
  "products",
  "collections",
  "about",
  "downloads",
  "calculator",
  "contact",
] as const;

const hrefMap: Record<(typeof navKeys)[number], string> = {
  products: "/products",
  collections: "/collections",
  about: "/about",
  downloads: "/downloads",
  calculator: "/calculator",
  contact: "/contact",
};

const mobileExtra = [
  { key: "production" as const, href: "/production" },
  { key: "blog" as const, href: "/blog" },
  { key: "partners" as const, href: "/partners" },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { theme, setTheme } = useTheme();
  const { mobileNavOpen, setMobileNavOpen } = useUiStore();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24 || !isHome);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "glass border-b border-border/60 py-3 shadow-soft"
          : "bg-transparent py-5",
      )}
    >
      <div className="container-wide flex items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/50 bg-primary text-accent transition group-hover:scale-105">
            <span className="display text-lg">C</span>
          </span>
          <span
            className={cn(
              "display text-sm tracking-[0.28em] uppercase transition-colors",
              solid ? "text-foreground" : "text-white",
            )}
          >
            Comfort
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={hrefMap[key]}
              className={cn(
                "text-[13px] tracking-wide transition-colors hover:text-accent",
                solid ? "text-foreground/80" : "text-white/85",
                pathname.startsWith(hrefMap[key]) && "text-accent",
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            {locales.map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium transition",
                  locale === l
                    ? "bg-accent text-accent-foreground"
                    : solid
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/70 hover:text-white",
                )}
                aria-current={locale === l ? "true" : undefined}
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>

          {mounted && (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Toggle theme"
              className={cn(!solid && "text-white hover:bg-white/10")}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={t("search")}
            className={cn("hidden sm:inline-flex", !solid && "text-white hover:bg-white/10")}
          >
            <Search />
          </Button>

          <Button
            asChild
            variant={solid ? "accent" : "glass"}
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link href="/contact">
              {t("contactCta")}
              <ArrowUpRight />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className={cn("lg:hidden", !solid && "text-white hover:bg-white/10")}
            aria-label="Menu"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass container-wide mt-3 rounded-3xl p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={hrefMap[key]}
                  className="text-lg"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
              {mobileExtra.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-base text-muted-foreground"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={pathname}
                    locale={l}
                    className={cn(
                      "rounded-full px-3 py-1 text-sm",
                      locale === l ? "bg-accent text-accent-foreground" : "bg-muted",
                    )}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {localeNames[l]}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

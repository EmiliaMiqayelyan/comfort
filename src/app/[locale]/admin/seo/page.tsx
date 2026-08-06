"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Textarea } from "@/components/atoms/textarea";
import { Button } from "@/components/atoms/button";

export default function AdminSeoPage() {
  const t = useTranslations("admin");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    homeTitle: "Comfort — Premium baseboards, panels & moldings",
    homeDescription: "Discover Comfort architectural interior products.",
    ogImage: "/og/home.jpg",
    robotsTxt: "User-agent: *\nAllow: /",
    sitemapEnabled: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader title={t("seo")} description={t("seoDesc")} />

        <form
          onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          className="max-w-2xl space-y-6 rounded-2xl border border-white/5 bg-[#141a24] p-6"
        >
          <div className="space-y-2">
            <Label className="text-zinc-300">{t("homeTitle")}</Label>
            <Input
              value={form.homeTitle}
              onChange={(e) => setForm({ ...form, homeTitle: e.target.value })}
              className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">{t("homeDescription")}</Label>
            <Textarea
              value={form.homeDescription}
              onChange={(e) => setForm({ ...form, homeDescription: e.target.value })}
              className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">{t("ogImage")}</Label>
            <Input
              value={form.ogImage}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">robots.txt</Label>
            <Textarea
              value={form.robotsTxt}
              onChange={(e) => setForm({ ...form, robotsTxt: e.target.value })}
              className="min-h-[100px] rounded-xl border-white/10 bg-[#0b0f17] font-mono text-sm text-zinc-100"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
              {t("save")}
            </Button>
            {saved && <span className="text-sm text-emerald-400">{t("saved")}</span>}
          </div>
        </form>
      </AdminShell>
    </AuthGate>
  );
}

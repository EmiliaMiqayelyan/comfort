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

export default function AdminHomepagePage() {
  const t = useTranslations("admin");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    heroTitle: "Baseboards. 3D Panels. Moldings.",
    heroSubtitle: "Modern architectural solutions of exceptional quality for every space.",
    heroCta: "Explore products",
    featuredCollection: "Modern",
    showProjects: true,
    showCalculator: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader title={t("homepage")} description={t("homepageDesc")} />

        <form
          onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          className="max-w-2xl space-y-6 rounded-2xl border border-white/5 bg-[#141a24] p-6"
        >
          <div className="space-y-2">
            <Label className="text-zinc-300">{t("heroTitle")}</Label>
            <Input
              value={form.heroTitle}
              onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
              className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">{t("heroSubtitle")}</Label>
            <Textarea
              value={form.heroSubtitle}
              onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">{t("heroCta")}</Label>
            <Input
              value={form.heroCta}
              onChange={(e) => setForm({ ...form, heroCta: e.target.value })}
              className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">{t("featuredCollection")}</Label>
            <Input
              value={form.featuredCollection}
              onChange={(e) => setForm({ ...form, featuredCollection: e.target.value })}
              className="rounded-xl border-white/10 bg-[#0b0f17] text-zinc-100"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={form.showProjects}
                onChange={(e) => setForm({ ...form, showProjects: e.target.checked })}
                className="rounded border-white/20 bg-[#0b0f17] accent-accent"
              />
              {t("showProjects")}
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={form.showCalculator}
                onChange={(e) => setForm({ ...form, showCalculator: e.target.checked })}
                className="rounded border-white/20 bg-[#0b0f17] accent-accent"
              />
              {t("showCalculator")}
            </label>
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

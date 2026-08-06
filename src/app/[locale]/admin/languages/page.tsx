"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable } from "@/features/admin/data-table";
import { Badge } from "@/components/atoms/badge";
import { mockLanguages } from "@/features/admin/mock-data";
import { cn } from "@/lib/utils";

export default function AdminLanguagesPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockLanguages);

  const toggleEnabled = (id: string) => {
    setItems((prev) =>
      prev.map((lang) => (lang.id === id ? { ...lang, enabled: !lang.enabled } : lang)),
    );
  };

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader title={t("languages")} description={t("languagesDesc")} />
        <DataTable
          data={items}
          editLabel={t("edit")}
          emptyLabel={t("noResults")}
          onEdit={() => {}}
          columns={[
            { key: "name", header: t("name") },
            { key: "code", header: "Code" },
            {
              key: "enabled",
              header: t("status"),
              render: (row) => (
                <button type="button" onClick={() => toggleEnabled(row.id)}>
                  <Badge
                    className={cn(
                      "cursor-pointer border-0",
                      row.enabled
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-zinc-500/10 text-zinc-400",
                    )}
                  >
                    {row.enabled ? t("enabled") : t("disabled")}
                  </Badge>
                </button>
              ),
            },
            {
              key: "default",
              header: "Default",
              render: (row) =>
                row.default ? (
                  <Badge className="border-0 bg-accent/15 text-accent">{t("default")}</Badge>
                ) : (
                  <span className="text-zinc-500">—</span>
                ),
            },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

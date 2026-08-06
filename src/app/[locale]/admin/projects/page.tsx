"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable, StatusBadge } from "@/features/admin/data-table";
import { mockProjects } from "@/features/admin/mock-data";

export default function AdminProjectsPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockProjects);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={t("projects")}
          createLabel={t("create")}
          onCreate={() =>
            setItems((prev) => [
              { id: String(Date.now()), title: "New Project", location: "Yerevan", year: 2026, status: "draft" },
              ...prev,
            ])
          }
        />
        <DataTable
          data={items}
          editLabel={t("edit")}
          emptyLabel={t("noResults")}
          onEdit={() => {}}
          columns={[
            { key: "title", header: t("name") },
            { key: "location", header: "Location" },
            { key: "year", header: "Year" },
            { key: "status", header: t("status"), render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

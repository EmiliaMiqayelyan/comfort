"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable, StatusBadge } from "@/features/admin/data-table";
import { mockCategories } from "@/features/admin/mock-data";

export default function AdminCategoriesPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockCategories);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={t("categories")}
          createLabel={t("create")}
          onCreate={() =>
            setItems((prev) => [
              { id: String(Date.now()), name: "New Category", slug: "new-category", products: 0, status: "draft" },
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
            { key: "name", header: t("name") },
            { key: "slug", header: "Slug" },
            { key: "products", header: t("products") },
            { key: "status", header: t("status"), render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

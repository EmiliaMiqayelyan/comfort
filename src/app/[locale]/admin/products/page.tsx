"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable, StatusBadge } from "@/features/admin/data-table";
import { mockProducts } from "@/features/admin/mock-data";

export default function AdminProductsPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockProducts);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={t("products")}
          description={t("productsDesc")}
          createLabel={t("create")}
          onCreate={() =>
            setItems((prev) => [
              { id: String(Date.now()), name: "New Product", sku: "NEW-001", category: "Baseboards", status: "draft", updated: "2026-08-06" },
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
            { key: "sku", header: "SKU" },
            { key: "category", header: t("categories") },
            { key: "status", header: t("status"), render: (row) => <StatusBadge status={row.status} /> },
            { key: "updated", header: t("updated") },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

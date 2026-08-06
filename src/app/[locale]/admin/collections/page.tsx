"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable } from "@/features/admin/data-table";
import { mockCollections } from "@/features/admin/mock-data";

export default function AdminCollectionsPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockCollections);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={t("collections")}
          createLabel={t("create")}
          onCreate={() =>
            setItems((prev) => [
              { id: String(Date.now()), name: "New Collection", slug: "new", products: 0, style: "Modern" },
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
            { key: "style", header: "Style" },
            { key: "products", header: t("products") },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

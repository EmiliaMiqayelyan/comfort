"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable } from "@/features/admin/data-table";
import { mockModels } from "@/features/admin/mock-data";

export default function AdminModelsPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockModels);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={t("models")}
          description={t("modelsDesc")}
          createLabel={t("create")}
          onCreate={() =>
            setItems((prev) => [
              { id: String(Date.now()), name: "New 3D Model", format: "GLB", size: "0 MB", linkedProduct: "—" },
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
            { key: "format", header: "Format" },
            { key: "size", header: "Size" },
            { key: "linkedProduct", header: t("linkedProduct") },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

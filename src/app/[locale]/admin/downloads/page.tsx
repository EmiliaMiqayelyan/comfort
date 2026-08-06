"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable } from "@/features/admin/data-table";
import { mockDownloads } from "@/features/admin/mock-data";

export default function AdminDownloadsPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockDownloads);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={t("downloads")}
          createLabel={t("create")}
          onCreate={() =>
            setItems((prev) => [
              { id: String(Date.now()), name: "New File", type: "PDF", size: "0 MB", downloads: 0 },
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
            { key: "type", header: "Type" },
            { key: "size", header: "Size" },
            { key: "downloads", header: "Downloads" },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

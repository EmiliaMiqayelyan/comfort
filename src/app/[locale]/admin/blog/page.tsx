"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable, StatusBadge } from "@/features/admin/data-table";
import { mockBlogPosts } from "@/features/admin/mock-data";

export default function AdminBlogPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockBlogPosts);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={t("blog")}
          createLabel={t("create")}
          onCreate={() =>
            setItems((prev) => [
              { id: String(Date.now()), title: "New Article", author: "Admin", status: "draft", date: "2026-08-06" },
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
            { key: "author", header: "Author" },
            { key: "status", header: t("status"), render: (row) => <StatusBadge status={row.status} /> },
            { key: "date", header: "Date" },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

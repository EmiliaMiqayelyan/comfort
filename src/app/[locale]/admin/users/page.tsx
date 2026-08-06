"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable, RoleBadge } from "@/features/admin/data-table";
import { mockUsers } from "@/features/admin/mock-data";

export default function AdminUsersPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState(mockUsers);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={t("users")}
          description={t("usersDesc")}
          createLabel={t("create")}
          onCreate={() =>
            setItems((prev) => [
              { id: String(Date.now()), name: "New User", email: "new@comfort.am", role: "editor" as const, lastActive: "2026-08-06" },
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
            { key: "email", header: t("email") },
            { key: "role", header: t("role"), render: (row) => <RoleBadge role={row.role} /> },
            { key: "lastActive", header: t("lastActive") },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

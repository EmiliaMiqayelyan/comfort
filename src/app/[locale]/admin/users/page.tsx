"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { DataTable, RoleBadge } from "@/features/admin/data-table";
import { adminApi, type AuthUser } from "@/lib/api";

export default function AdminUsersPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<AuthUser[]>([]);

  useEffect(() => {
    adminApi.users().then((users) => setItems(users ?? []));
  }, []);

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader title={t("users")} description={t("usersDesc")} />
        <DataTable
          data={items}
          emptyLabel={t("noResults")}
          columns={[
            { key: "name", header: t("name") },
            { key: "email", header: t("email") },
            { key: "role", header: t("role"), render: (row) => <RoleBadge role={row.role} /> },
          ]}
        />
      </AdminShell>
    </AuthGate>
  );
}

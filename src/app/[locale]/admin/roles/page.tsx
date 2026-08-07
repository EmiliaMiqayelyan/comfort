"use client";

import { useTranslations } from "next-intl";
import { AdminListPage } from "@/features/admin/admin-list-page";
import { mockRoles } from "@/features/admin/mock-data";

export default function AdminRolesPage() {
  const t = useTranslations("admin");
  return (
    <AdminListPage
      titleKey="roles"
      description={t("permissions")}
      initialRows={mockRoles}
      createRow={() => ({
        id: String(Date.now()),
        name: "New role",
        users: "0",
        permissions: "Custom",
      })}
      columns={[
        { key: "name", header: t("name") },
        { key: "users", header: t("users") },
        { key: "permissions", header: t("permissions") },
      ]}
    />
  );
}

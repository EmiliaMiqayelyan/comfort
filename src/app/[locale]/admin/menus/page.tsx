"use client";

import { useTranslations } from "next-intl";
import { AdminListPage } from "@/features/admin/admin-list-page";
import { mockMenus } from "@/features/admin/mock-data";

export default function AdminMenusPage() {
  const t = useTranslations("admin");
  return (
    <AdminListPage
      titleKey="menus"
      description={t("menus")}
      initialRows={mockMenus}
      createRow={() => ({
        id: String(Date.now()),
        name: "New menu",
        items: "0",
        locale: "all",
        status: "draft",
      })}
      columns={[
        { key: "name", header: t("name") },
        { key: "items", header: "Items" },
        { key: "locale", header: t("languages") },
        { key: "status", header: t("status"), status: true },
      ]}
    />
  );
}

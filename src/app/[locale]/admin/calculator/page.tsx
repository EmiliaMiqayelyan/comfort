"use client";

import { useTranslations } from "next-intl";
import { AdminListPage } from "@/features/admin/admin-list-page";
import { mockCalculatorSettings } from "@/features/admin/mock-data";

export default function AdminCalculatorPage() {
  const t = useTranslations("admin");
  return (
    <AdminListPage
      titleKey="calculator"
      description={t("calculator")}
      initialRows={mockCalculatorSettings}
      createRow={() => ({
        id: String(Date.now()),
        name: "New setting",
        value: "0",
        status: "draft",
      })}
      columns={[
        { key: "name", header: t("name") },
        { key: "value", header: "Value" },
        { key: "status", header: t("status"), status: true },
      ]}
    />
  );
}

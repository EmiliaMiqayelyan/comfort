"use client";

import { useTranslations } from "next-intl";
import { AdminListPage } from "@/features/admin/admin-list-page";
import { mockColors } from "@/features/admin/mock-data";

export default function AdminColorsPage() {
  const t = useTranslations("admin");
  return (
    <AdminListPage
      titleKey="colors"
      description={t("colors")}
      initialRows={mockColors}
      createRow={() => ({
        id: String(Date.now()),
        name: "New color",
        hex: "#CCCCCC",
        status: "draft",
      })}
      columns={[
        { key: "name", header: t("name") },
        { key: "hex", header: "HEX" },
        { key: "status", header: t("status"), status: true },
      ]}
    />
  );
}

"use client";

import { useTranslations } from "next-intl";
import { AdminListPage } from "@/features/admin/admin-list-page";
import { mockMaterials } from "@/features/admin/mock-data";

export default function AdminMaterialsPage() {
  const t = useTranslations("admin");
  return (
    <AdminListPage
      titleKey="materials"
      description={t("materials")}
      initialRows={mockMaterials}
      createRow={() => ({
        id: String(Date.now()),
        name: "New material",
        density: "—",
        status: "draft",
      })}
      columns={[
        { key: "name", header: t("name") },
        { key: "density", header: "Density" },
        { key: "status", header: t("status"), status: true },
      ]}
    />
  );
}

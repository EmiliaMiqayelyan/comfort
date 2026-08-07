"use client";

import { useTranslations } from "next-intl";
import { AdminListPage } from "@/features/admin/admin-list-page";
import { mockVisualizerAssets } from "@/features/admin/mock-data";

export default function AdminVisualizerPage() {
  const t = useTranslations("admin");
  return (
    <AdminListPage
      titleKey="visualizer"
      description={t("visualizer")}
      initialRows={mockVisualizerAssets}
      createRow={() => ({
        id: String(Date.now()),
        name: "New asset",
        type: "Room",
        status: "draft",
      })}
      columns={[
        { key: "name", header: t("name") },
        { key: "type", header: "Type" },
        { key: "status", header: t("status"), status: true },
      ]}
    />
  );
}

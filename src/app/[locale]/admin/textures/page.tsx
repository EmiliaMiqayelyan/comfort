"use client";

import { useTranslations } from "next-intl";
import { AdminListPage } from "@/features/admin/admin-list-page";
import { mockTextures } from "@/features/admin/mock-data";

export default function AdminTexturesPage() {
  const t = useTranslations("admin");
  return (
    <AdminListPage
      titleKey="textures"
      description={t("textures")}
      initialRows={mockTextures}
      createRow={() => ({
        id: String(Date.now()),
        name: "New texture",
        map: "texture.jpg",
        status: "draft",
      })}
      columns={[
        { key: "name", header: t("name") },
        { key: "map", header: "Map" },
        { key: "status", header: t("status"), status: true },
      ]}
    />
  );
}

"use client";

import { useTranslations } from "next-intl";
import { AdminListPage } from "@/features/admin/admin-list-page";
import { mockCertificates } from "@/features/admin/mock-data";

export default function AdminCertificatesPage() {
  const t = useTranslations("admin");
  return (
    <AdminListPage
      titleKey="certificates"
      description={t("certificates")}
      initialRows={mockCertificates}
      createRow={() => ({
        id: String(Date.now()),
        name: "New certificate",
        issuer: "—",
        status: "draft",
        updated: new Date().toISOString().slice(0, 10),
      })}
      columns={[
        { key: "name", header: t("name") },
        { key: "issuer", header: "Issuer" },
        { key: "status", header: t("status"), status: true },
        { key: "updated", header: t("updated") },
      ]}
    />
  );
}

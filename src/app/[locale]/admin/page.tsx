"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Package, Building2, Image, Users, Activity } from "lucide-react";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { StatCard } from "@/features/admin/stat-card";
import { adminApi, catalogApi } from "@/lib/api";
import { mockRecentActivity } from "@/features/admin/mock-data";

export default function AdminDashboardPage() {
  const t = useTranslations("admin");
  const [counts, setCounts] = useState({ products: 0, projects: 0, users: 0 });

  useEffect(() => {
    Promise.all([catalogApi.products(), catalogApi.projects(), adminApi.users()]).then(
      ([products, projects, users]) => {
        setCounts({
          products: products?.length ?? 0,
          projects: projects?.length ?? 0,
          users: users?.length ?? 0,
        });
      },
    );
  }, []);

  return (
    <AuthGate>
      <AdminShell>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">{t("dashboard")}</h1>
          <p className="mt-1 text-sm text-zinc-400">{t("welcomeBack")}</p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title={t("statsProducts")} value={counts.products} icon={Package} />
          <StatCard title={t("statsProjects")} value={counts.projects} icon={Building2} />
          <StatCard title={t("statsMedia")} value="—" icon={Image} />
          <StatCard title={t("statsUsers")} value={counts.users} icon={Users} />
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#141a24]">
          <div className="flex items-center gap-2 border-b border-white/5 px-6 py-4">
            <Activity className="h-4 w-4 text-accent" />
            <h2 className="font-medium text-zinc-100">{t("recentActivity")}</h2>
          </div>
          <ul className="divide-y divide-white/5">
            {mockRecentActivity.map((item) => (
              <li key={item.id} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-zinc-200">
                    <span className="font-medium">{item.action}</span>
                    <span className="text-zinc-500"> — </span>
                    <span className="text-zinc-400">{item.target}</span>
                  </p>
                  <p className="text-xs text-zinc-500">{item.user}</p>
                </div>
                <span className="text-xs text-zinc-500">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </AdminShell>
    </AuthGate>
  );
}

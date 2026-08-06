"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/stores";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { cn } from "@/lib/utils";
import { getNavForRole } from "./role-nav";
import { RoleBadge } from "./data-table";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const t = useTranslations("admin");
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const navItems = getNavForRole(user.role);

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full overflow-hidden">
      <aside
        className={cn(
          "flex shrink-0 flex-col border-r border-white/5 bg-[#0b0f17] transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-4">
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold tracking-wide text-zinc-50">Comfort</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{t("title")}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                      active
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
                      collapsed && "justify-center px-2",
                    )}
                    title={collapsed ? t(item.labelKey) : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{t(item.labelKey)}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/5 p-3">
          {!collapsed && (
            <div className="mb-3 rounded-xl bg-white/[0.03] px-3 py-2.5">
              <p className="truncate text-sm font-medium text-zinc-100">{user.name}</p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
              <div className="mt-2">
                <RoleBadge role={user.role} />
              </div>
            </div>
          )}
          {collapsed && (
            <div className="mb-2 flex justify-center">
              <Badge className="border-0 bg-accent/15 px-2 text-[10px] uppercase text-accent">
                {user.role.slice(0, 3)}
              </Badge>
            </div>
          )}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full rounded-xl text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
              collapsed ? "justify-center px-2" : "justify-start",
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && t("logout")}
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#0f1319]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">{children}</div>
      </main>
    </div>
  );
}

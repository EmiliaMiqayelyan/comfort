import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/5 bg-[#141a24] p-5 shadow-soft transition-colors hover:border-accent/20",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-zinc-50">{value}</p>
          {trend && <p className="text-xs text-accent">{trend}</p>}
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

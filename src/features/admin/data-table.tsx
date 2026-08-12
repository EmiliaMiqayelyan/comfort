"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  editLabel?: string;
  deleteLabel?: string;
  emptyLabel?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
  emptyLabel = "No results",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-[#141a24] px-6 py-16 text-center text-sm text-zinc-400">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#141a24]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-zinc-400">
              {columns.map((col) => (
                <th key={col.key} className={cn("px-5 py-3.5 font-medium", col.className)}>
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.02]"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-5 py-4 text-zinc-200", col.className)}>
                    {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key]?.toString()}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(row)}
                          className="rounded-lg text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          {editLabel}
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(row)}
                          className="rounded-lg text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deleteLabel}
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const isPublished = status === "published";
  return (
    <Badge
      className={cn(
        "border-0 capitalize",
        isPublished
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-amber-500/10 text-amber-400",
      )}
    >
      {status}
    </Badge>
  );
}

export function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    admin: "bg-accent/15 text-accent",
    manager: "bg-blue-500/10 text-blue-400",
    editor: "bg-violet-500/10 text-violet-400",
    translator: "bg-cyan-500/10 text-cyan-400",
    dealer: "bg-orange-500/10 text-orange-400",
  };
  return (
    <Badge className={cn("border-0 capitalize", colors[role] ?? "bg-zinc-500/10 text-zinc-400")}>
      {role}
    </Badge>
  );
}

"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import { Upload, Folder, Search, FileImage, FileVideo, FileText, Box, Layers } from "lucide-react";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { cn } from "@/lib/utils";
import { mockMedia } from "@/features/admin/mock-data";
import type { MediaAsset } from "@/types";

const fileTypes = ["all", "image", "video", "pdf", "glb", "usdz", "texture"] as const;
const folders = ["all", "homepage", "models", "downloads", "textures", "videos"];

const typeIcons: Record<string, LucideIcon> = {
  image: FileImage,
  video: FileVideo,
  pdf: FileText,
  glb: Box,
  usdz: Box,
  texture: Layers,
};

function formatSize(bytes: number) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${(bytes / 1_000).toFixed(0)} KB`;
}

export default function AdminMediaPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<MediaAsset[]>(mockMedia);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [folderFilter, setFolderFilter] = useState("all");
  const [dragOver, setDragOver] = useState(false);

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || item.type === typeFilter;
    const matchFolder = folderFilter === "all" || item.folder === folderFilter;
    return matchSearch && matchType && matchFolder;
  });

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      const newItems: MediaAsset[] = files.map((file, i) => ({
        id: String(Date.now() + i),
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "pdf",
        url: URL.createObjectURL(file),
        folder: folderFilter === "all" ? "uploads" : folderFilter,
        size: file.size,
        createdAt: new Date().toISOString().slice(0, 10),
      }));
      setItems((prev) => [...newItems, ...prev]);
    },
    [folderFilter],
  );

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader title={t("media")} description={t("mediaDesc")} />

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "mb-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors",
            dragOver ? "border-accent bg-accent/5" : "border-white/10 bg-[#141a24]",
          )}
        >
          <Upload className="mb-3 h-8 w-8 text-zinc-500" />
          <p className="text-sm font-medium text-zinc-300">{t("dragDrop")}</p>
          <p className="mt-1 text-xs text-zinc-500">{t("uploadHint")}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 rounded-xl border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
          >
            {t("upload")}
          </Button>
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search")}
              className="rounded-xl border-white/10 bg-[#141a24] pl-10 text-zinc-100"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {fileTypes.map((type) => (
              <Button
                key={type}
                variant="ghost"
                size="sm"
                onClick={() => setTypeFilter(type)}
                className={cn(
                  "rounded-lg capitalize",
                  typeFilter === type
                    ? "bg-accent/10 text-accent"
                    : "text-zinc-400 hover:bg-white/5",
                )}
              >
                {type === "all" ? t("allTypes") : type}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Folder className="h-4 w-4 text-zinc-500" />
          {folders.map((folder) => (
            <Button
              key={folder}
              variant="ghost"
              size="sm"
              onClick={() => setFolderFilter(folder)}
              className={cn(
                "rounded-lg capitalize",
                folderFilter === folder
                  ? "bg-white/10 text-zinc-100"
                  : "text-zinc-400 hover:bg-white/5",
              )}
            >
              {folder === "all" ? t("allFolders") : folder}
            </Button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const Icon = typeIcons[item.type] ?? FileText;
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#141a24] p-4 transition-colors hover:border-white/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-200">{item.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge className="border-0 bg-white/5 px-2 text-[10px] uppercase text-zinc-400">
                      {item.type}
                    </Badge>
                    <span className="text-xs text-zinc-500">{formatSize(item.size)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AdminShell>
    </AuthGate>
  );
}

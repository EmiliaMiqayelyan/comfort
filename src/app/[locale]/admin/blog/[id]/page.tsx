"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { BlogForm } from "@/features/admin/blog-form";
import { catalogApi } from "@/lib/api";
import type { BlogPost } from "@/types";

export default function AdminEditBlogPage() {
  const params = useParams<{ id: string }>();
  const t = useTranslations("common");
  const [item, setItem] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (!params.id) return;
    catalogApi.post(params.id).then(setItem);
  }, [params.id]);

  if (!item) {
    return (
      <AuthGate>
        <AdminShell>
          <p className="text-sm text-zinc-400">{item === undefined ? t("loading") : t("error")}</p>
        </AdminShell>
      </AuthGate>
    );
  }

  return <BlogForm post={item} />;
}

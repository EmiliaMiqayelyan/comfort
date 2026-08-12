"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { ProductForm } from "@/features/admin/product-form";
import { catalogApi } from "@/lib/api";
import type { Product } from "@/types";

export default function AdminEditProductPage() {
  const params = useParams<{ id: string }>();
  const t = useTranslations("common");
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    if (!params.id) return;
    catalogApi.product(params.id).then((item) => setProduct(item));
  }, [params.id]);

  if (product === undefined) {
    return (
      <AuthGate>
        <AdminShell>
          <p className="text-sm text-zinc-400">{t("loading")}</p>
        </AdminShell>
      </AuthGate>
    );
  }

  if (!product) {
    return (
      <AuthGate>
        <AdminShell>
          <p className="text-sm text-zinc-400">{t("error")}</p>
        </AdminShell>
      </AuthGate>
    );
  }

  return <ProductForm product={product} />;
}

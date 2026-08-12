"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Input } from "@/components/atoms/input";
import { AuthGate } from "@/features/admin/auth-gate";
import { AdminShell } from "@/features/admin/admin-shell";
import { PageHeader } from "@/features/admin/page-header";
import {
  Field,
  FormActions,
  LocalizedInputs,
  Section,
  adminFieldClass,
  emptyLocalized,
  slugify,
} from "@/features/admin/form-ui";
import { ApiError, adminApi } from "@/lib/api";
import type { LocalizedString, ProductCategory } from "@/types";

export function CategoryForm({ category }: { category?: ProductCategory }) {
  const t = useTranslations("admin");
  const router = useRouter();
  const isEdit = Boolean(category);
  const [name, setName] = useState<LocalizedString>(category?.name ?? emptyLocalized());
  const [description, setDescription] = useState<LocalizedString>(
    category?.description ?? emptyLocalized(),
  );
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [image, setImage] = useState(category?.image ?? "/products/plinth.png");
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.en.trim() || !slug.trim()) {
      setError(t("requiredFields"));
      return;
    }
    setSaving(true);
    setError(null);
    const payload = { name, description, slug, image };
    try {
      if (isEdit && category) await adminApi.updateCategory(category.id, payload);
      else await adminApi.createCategory(payload);
      router.replace("/admin/categories");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader title={isEdit ? t("editCategory") : t("createCategory")} />
        <form onSubmit={handleSubmit} className="space-y-6 pb-16">
          <Section title={t("name")}>
            <LocalizedInputs
              label={t("name")}
              value={name}
              onChange={(value) => {
                setName(value);
                if (!slugLocked) setSlug(slugify(value.en));
              }}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Slug">
                <Input
                  value={slug}
                  onChange={(e) => {
                    setSlugLocked(true);
                    setSlug(slugify(e.target.value));
                  }}
                  className={adminFieldClass}
                  required
                />
              </Field>
              <Field label={t("images")}>
                <Input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className={adminFieldClass}
                />
              </Field>
            </div>
          </Section>
          <Section title={t("description")}>
            <LocalizedInputs
              label={t("description")}
              value={description}
              onChange={setDescription}
              multiline
            />
          </Section>
          <FormActions
            cancelHref="/admin/categories"
            cancelLabel={t("cancel")}
            saveLabel={saving ? t("saving") : isEdit ? t("save") : t("create")}
            saving={saving}
            error={error}
          />
        </form>
      </AdminShell>
    </AuthGate>
  );
}

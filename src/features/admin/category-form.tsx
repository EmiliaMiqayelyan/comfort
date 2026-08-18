"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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
import { ApiError, adminApi, catalogApi } from "@/lib/api";
import { FileUploadField } from "@/features/admin/file-upload";
import { AdminSelect } from "@/features/admin/admin-select";
import { getLocalized } from "@/data/catalog";
import { parentCategories } from "@/lib/category-tree";
import type { LocalizedString, ProductCategory } from "@/types";

export function CategoryForm({ category }: { category?: ProductCategory }) {
  const t = useTranslations("admin");
  const locale = useLocale();
  const router = useRouter();
  const isEdit = Boolean(category);
  const [name, setName] = useState<LocalizedString>(category?.name ?? emptyLocalized());
  const [description, setDescription] = useState<LocalizedString>(
    category?.description ?? emptyLocalized(),
  );
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [image, setImage] = useState(category?.image ?? "/products/plinth.png");
  const [parentId, setParentId] = useState(category?.parentId ?? "");
  const [parents, setParents] = useState<ProductCategory[]>([]);
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    catalogApi.categories().then((items) => {
      setParents(parentCategories(items ?? []).filter((item) => item.id !== category?.id));
    });
  }, [category?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.en.trim() || !slug.trim()) {
      setError(t("requiredFields"));
      return;
    }
    setSaving(true);
    setError(null);
    const payload = { name, description, slug, image, parentId: parentId || null };
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
              <Field label={t("parentCategory")}>
                <AdminSelect
                  value={parentId || "__none__"}
                  onValueChange={(value) => setParentId(value === "__none__" ? "" : value)}
                  placeholder={t("parentCategory")}
                  options={[
                    { value: "__none__", label: t("topLevelCategory") },
                    ...parents.map((item) => ({
                      value: item.id,
                      label: getLocalized(item.name, locale),
                    })),
                  ]}
                />
              </Field>
              <Field label={t("images")}>
                <FileUploadField value={image} onChange={setImage} accept="image/*" label={t("upload")} />
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

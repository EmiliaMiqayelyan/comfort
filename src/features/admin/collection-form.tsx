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
import { AdminSelect } from "@/features/admin/admin-select";
import { ApiError, adminApi } from "@/lib/api";
import type { Collection, LocalizedString } from "@/types";

export function CollectionForm({ collection }: { collection?: Collection }) {
  const t = useTranslations("admin");
  const router = useRouter();
  const isEdit = Boolean(collection);
  const [name, setName] = useState<LocalizedString>(collection?.name ?? emptyLocalized());
  const [description, setDescription] = useState<LocalizedString>(
    collection?.description ?? emptyLocalized(),
  );
  const [slug, setSlug] = useState(collection?.slug ?? "");
  const [image, setImage] = useState(collection?.image ?? "/products/plinth.png");
  const [style, setStyle] = useState(collection?.style ?? "modern");
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
    const payload = { name, description, slug, image, style };
    try {
      if (isEdit && collection) await adminApi.updateCollection(collection.id, payload);
      else await adminApi.createCollection(payload);
      router.replace("/admin/collections");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader title={isEdit ? t("editCollection") : t("createCollection")} />
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
            <div className="grid gap-4 md:grid-cols-3">
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
              <Field label="Style">
                <AdminSelect
                  value={style}
                  onValueChange={setStyle}
                  placeholder="Style"
                  options={[
                    { value: "minimal", label: "minimal" },
                    { value: "natural", label: "natural" },
                    { value: "modern", label: "modern" },
                    { value: "classic", label: "classic" },
                  ]}
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
            cancelHref="/admin/collections"
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

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
import type { BlogPost, LocalizedString } from "@/types";

export function BlogForm({ post }: { post?: BlogPost }) {
  const t = useTranslations("admin");
  const router = useRouter();
  const isEdit = Boolean(post);
  const [title, setTitle] = useState<LocalizedString>(post?.title ?? emptyLocalized());
  const [excerpt, setExcerpt] = useState<LocalizedString>(post?.excerpt ?? emptyLocalized());
  const [content, setContent] = useState<LocalizedString>(post?.content ?? emptyLocalized());
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "/products/plinth.png");
  const [category, setCategory] = useState(post?.category ?? "design");
  const [tags, setTags] = useState(post?.tags?.join(", ") ?? "");
  const [authorName, setAuthorName] = useState(post?.author.name ?? "Admin");
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ?? new Date().toISOString().slice(0, 10),
  );
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.en.trim() || !slug.trim()) {
      setError(t("requiredFields"));
      return;
    }
    setSaving(true);
    setError(null);
    const payload = {
      title,
      excerpt,
      content,
      slug,
      coverImage,
      category,
      tags: tags.split(",").map((item) => item.trim()).filter(Boolean),
      publishedAt,
      author: {
        id: post?.author.id ?? "admin",
        name: authorName,
        avatar: post?.author.avatar ?? "/products/plinth.png",
        role: post?.author.role ?? { en: "Editor", ru: "Редактор", am: "Խմբագիր" },
      },
    };
    try {
      if (isEdit && post) await adminApi.updatePost(post.id, payload);
      else await adminApi.createPost(payload);
      router.replace("/admin/blog");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader title={isEdit ? t("editPost") : t("createPost")} />
        <form onSubmit={handleSubmit} className="space-y-6 pb-16">
          <Section title={t("name")}>
            <LocalizedInputs
              label={t("name")}
              value={title}
              onChange={(value) => {
                setTitle(value);
                if (!slugLocked) setSlug(slugify(value.en));
              }}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Slug">
                <Input
                  value={slug}
                  onChange={(e) => {
                    setSlugLocked(true);
                    setSlug(slugify(e.target.value));
                  }}
                  className={adminFieldClass}
                />
              </Field>
              <Field label={t("categories")}>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} className={adminFieldClass} />
              </Field>
              <Field label="Author">
                <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} className={adminFieldClass} />
              </Field>
              <Field label="Date">
                <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={adminFieldClass} />
              </Field>
            </div>
            <Field label={t("images")}>
              <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className={adminFieldClass} />
            </Field>
            <Field label="Tags">
              <Input value={tags} onChange={(e) => setTags(e.target.value)} className={adminFieldClass} />
            </Field>
          </Section>
          <Section title={t("description")}>
            <LocalizedInputs label="Excerpt" value={excerpt} onChange={setExcerpt} multiline />
            <LocalizedInputs label="Content" value={content} onChange={setContent} multiline />
          </Section>
          <FormActions
            cancelHref="/admin/blog"
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

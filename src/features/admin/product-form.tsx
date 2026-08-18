"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/atoms/button";
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
import { FileUploadField } from "@/features/admin/file-upload";
import { AdminSelect } from "@/features/admin/admin-select";
import { CategoryAttachFields } from "@/features/admin/category-attach";
import { useQueryClient } from "@tanstack/react-query";
import { ApiError, adminApi } from "@/lib/api";
import { getLocalized } from "@/data/catalog";
import type {
  Collection,
  LocalizedString,
  Product,
  ProductCategory,
  ProductColor,
  ProductDownload,
  ProductSpec,
  ProductTexture,
} from "@/types";

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

const emptyColor = (): ProductColor => ({
  id: uid("color"),
  name: emptyLocalized(),
  hex: "#F7F7F4",
});

const emptyTexture = (): ProductTexture => ({
  id: uid("texture"),
  name: emptyLocalized(),
  mapUrl: "",
  previewUrl: "",
});

const emptySpec = (): ProductSpec => ({
  key: uid("spec"),
  label: emptyLocalized(),
  value: "",
  unit: "mm",
});

const emptyDownload = (): ProductDownload => ({
  id: uid("dl"),
  type: "pdf",
  label: emptyLocalized(),
  url: "",
  size: "",
});

function formatBytes(size?: number) {
  if (!size) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function toForm(product?: Product): Omit<Product, "id"> {
  return {
    slug: product?.slug ?? "",
    sku: product?.sku ?? "",
    name: product?.name ?? emptyLocalized(),
    description: product?.description ?? emptyLocalized(),
    categoryId: product?.categoryId ?? "",
    collectionId: product?.collectionId ?? "",
    images: product?.images?.length ? product.images : [""],
    modelUrl: product?.modelUrl ?? "",
    videoUrl: product?.videoUrl ?? "",
    height: product?.height ?? 80,
    width: product?.width ?? 16,
    depth: product?.depth ?? 16,
    length: product?.length ?? 2400,
    material: product?.material ?? "HD polymer",
    finish: product?.finish ?? "Matte",
    colors: product?.colors?.length ? product.colors : [emptyColor()],
    textures: product?.textures?.length ? product.textures : [emptyTexture()],
    specs: product?.specs?.length ? product.specs : [emptySpec()],
    downloads: product?.downloads ?? [],
    price: product?.price ?? 0,
    featured: product?.featured ?? false,
    availability: product?.availability ?? "in_stock",
  };
}

export function ProductForm({ product }: { product?: Product }) {
  const t = useTranslations("admin");
  const tp = useTranslations("product");
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = Boolean(product);
  const label = (key: string, fallback: string) => (t.has(key) ? t(key) : fallback);
  const [form, setForm] = useState(() => toForm(product));
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    Promise.all([adminApi.categories(), adminApi.collections()])
      .then(([nextCategories, nextCollections]) => {
        setCategories(nextCategories);
        setCollections(nextCollections);
      })
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : t("apiUnavailable"));
      });
  }, [t]);


  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNameChange = (name: LocalizedString) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: slugLocked ? prev.slug : slugify(name.en),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.en.trim() || !form.slug.trim() || !form.sku.trim() || !form.categoryId) {
      setError(t("requiredFields"));
      return;
    }

    setSaving(true);
    const payload: Partial<Product> = {
      ...form,
      collectionId: form.collectionId || "",
      images: form.images.map((url) => url.trim()).filter(Boolean),
      modelUrl: form.modelUrl?.trim() || undefined,
      videoUrl: form.videoUrl?.trim() || undefined,
      colors: form.colors.filter((color) => color.name.en.trim() || color.hex),
      textures: form.textures.filter((texture) => texture.name.en.trim()),
      specs: form.specs.filter((spec) => spec.label.en.trim() || spec.value.trim()),
      downloads: form.downloads.filter((file) => file.url.trim() || file.label.en.trim()),
    };

    try {
      if (isEdit && product) {
        await adminApi.updateProduct(product.id, payload);
      } else {
        await adminApi.createProduct(payload);
      }
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      router.replace("/admin/products");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthGate>
      <AdminShell>
        <PageHeader
          title={isEdit ? t("editProduct") : t("createProduct")}
          description={t("productsDesc")}
        />

        <form onSubmit={handleSubmit} className="space-y-6 pb-16">
          <Section title={t("identity")}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field label={tp("sku")}>
                <Input
                  value={form.sku}
                  onChange={(e) => update("sku", e.target.value)}
                  className={adminFieldClass}
                  required
                />
              </Field>
              <Field label="Slug">
                <Input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugLocked(true);
                    update("slug", slugify(e.target.value));
                  }}
                  className={adminFieldClass}
                  required
                />
              </Field>
              <Field label={tp("availability")}>
                <AdminSelect
                  value={form.availability}
                  onValueChange={(value) =>
                    update("availability", value as Product["availability"])
                  }
                  placeholder={tp("availability")}
                  options={[
                    { value: "in_stock", label: tp("inStock") },
                    { value: "limited", label: tp("limited") },
                    { value: "preorder", label: tp("preorder") },
                  ]}
                />
              </Field>
              <Field label={t("price")}>
                <Input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => update("price", Number(e.target.value) || 0)}
                  className={adminFieldClass}
                />
              </Field>
            </div>
            <label className="flex items-center gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={Boolean(form.featured)}
                onChange={(e) => update("featured", e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              {t("featured")}
            </label>
          </Section>

          <Section title={t("name")}>
            <LocalizedInputs label={t("name")} value={form.name} onChange={handleNameChange} />
          </Section>

          <Section title={t("description")}>
            <LocalizedInputs
              label={t("description")}
              value={form.description}
              onChange={(description) => update("description", description)}
              multiline
            />
          </Section>

          <Section title={t("classification")}>
            <div className="grid gap-6 md:grid-cols-2">
              <CategoryAttachFields
                categories={categories}
                value={form.categoryId}
                onChange={(categoryId) => update("categoryId", categoryId)}
              />
              <Field label={t("collections")}>
                <AdminSelect
                  value={form.collectionId || "__none__"}
                  onValueChange={(value) =>
                    update("collectionId", value === "__none__" ? "" : value)
                  }
                  placeholder={t("selectCollection")}
                  options={[
                    { value: "__none__", label: label("noCollection", "No collection") },
                    ...collections.map((collection) => ({
                      value: collection.id,
                      label: getLocalized(collection.name, locale),
                    })),
                  ]}
                />
              </Field>
            </div>
          </Section>

          <Section title={t("dimensions")}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label={`${tp("height")} (mm)`}>
                <Input
                  type="number"
                  min={0}
                  value={form.height}
                  onChange={(e) => update("height", Number(e.target.value) || 0)}
                  className={adminFieldClass}
                />
              </Field>
              <Field label={`${t("width")} (mm)`}>
                <Input
                  type="number"
                  min={0}
                  value={form.width}
                  onChange={(e) => update("width", Number(e.target.value) || 0)}
                  className={adminFieldClass}
                />
              </Field>
              <Field label={`${tp("depth")} (mm)`}>
                <Input
                  type="number"
                  min={0}
                  value={form.depth}
                  onChange={(e) => update("depth", Number(e.target.value) || 0)}
                  className={adminFieldClass}
                />
              </Field>
              <Field label={`${tp("length")} (mm)`}>
                <Input
                  type="number"
                  min={0}
                  value={form.length}
                  onChange={(e) => update("length", Number(e.target.value) || 0)}
                  className={adminFieldClass}
                />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={tp("material")}>
                <Input
                  value={form.material}
                  onChange={(e) => update("material", e.target.value)}
                  className={adminFieldClass}
                />
              </Field>
              <Field label={tp("finish")}>
                <Input
                  value={form.finish}
                  onChange={(e) => update("finish", e.target.value)}
                  className={adminFieldClass}
                />
              </Field>
            </div>
          </Section>

          <Section title={t("images")}>
            <div className="space-y-3">
              {form.images.map((url, index) => (
                <div key={index} className="flex gap-3">
                  <div className="min-w-0 flex-1">
                    <FileUploadField
                      value={url}
                      accept="image/*"
                      label={t("upload")}
                      onChange={(next) => {
                        const images = [...form.images];
                        images[index] = next;
                        update("images", images);
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="mt-1 text-zinc-400 hover:text-red-400"
                    onClick={() =>
                      update(
                        "images",
                        form.images.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-white/10 text-zinc-200"
                onClick={() => update("images", [...form.images, ""])}
              >
                <Plus />
                {t("addImage")}
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="3D model">
                <FileUploadField
                  value={form.modelUrl ?? ""}
                  accept=".glb,.gltf,.usdz,model/gltf-binary"
                  label={t("upload")}
                  onChange={(modelUrl) => update("modelUrl", modelUrl)}
                />
              </Field>
              <Field label="Video">
                <FileUploadField
                  value={form.videoUrl ?? ""}
                  accept="video/*,.mp4,.webm"
                  label={t("upload")}
                  onChange={(videoUrl) => update("videoUrl", videoUrl)}
                />
              </Field>
            </div>
          </Section>

          <Section title={t("colors")}>
            <div className="space-y-6">
              {form.colors.map((color, index) => (
                <div key={color.id} className="space-y-3 rounded-xl border border-white/5 p-4">
                  <LocalizedInputs
                    label={t("name")}
                    value={color.name}
                    onChange={(name) => {
                      const colors = [...form.colors];
                      colors[index] = { ...color, name };
                      update("colors", colors);
                    }}
                  />
                  <div className="flex items-end gap-3">
                    <Field label="HEX">
                      <Input
                        value={color.hex}
                        onChange={(e) => {
                          const colors = [...form.colors];
                          colors[index] = { ...color, hex: e.target.value };
                          update("colors", colors);
                        }}
                        className={adminFieldClass}
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-zinc-400 hover:text-red-400"
                      onClick={() =>
                        update(
                          "colors",
                          form.colors.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <Trash2 />
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-white/10 text-zinc-200"
                onClick={() => update("colors", [...form.colors, emptyColor()])}
              >
                <Plus />
                {t("addColor")}
              </Button>
            </div>
          </Section>

          <Section title={t("textures")}>
            <div className="space-y-6">
              {form.textures.map((texture, index) => (
                <div key={texture.id} className="space-y-3 rounded-xl border border-white/5 p-4">
                  <LocalizedInputs
                    label={t("name")}
                    value={texture.name}
                    onChange={(name) => {
                      const textures = [...form.textures];
                      textures[index] = { ...texture, name };
                      update("textures", textures);
                    }}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Map URL">
                      <FileUploadField
                        value={texture.mapUrl}
                        accept="image/*"
                        label={t("upload")}
                        onChange={(mapUrl) => {
                          const textures = [...form.textures];
                          textures[index] = { ...texture, mapUrl };
                          update("textures", textures);
                        }}
                      />
                    </Field>
                    <Field label="Preview URL">
                      <FileUploadField
                        value={texture.previewUrl}
                        accept="image/*"
                        label={t("upload")}
                        onChange={(previewUrl) => {
                          const textures = [...form.textures];
                          textures[index] = { ...texture, previewUrl };
                          update("textures", textures);
                        }}
                      />
                    </Field>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-zinc-400 hover:text-red-400"
                    onClick={() =>
                      update(
                        "textures",
                        form.textures.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2 />
                    {t("delete")}
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-white/10 text-zinc-200"
                onClick={() => update("textures", [...form.textures, emptyTexture()])}
              >
                <Plus />
                {t("addTexture")}
              </Button>
            </div>
          </Section>

          <Section title={tp("specs")}>
            <div className="space-y-6">
              {form.specs.map((spec, index) => (
                <div key={spec.key} className="space-y-3 rounded-xl border border-white/5 p-4">
                  <LocalizedInputs
                    label={t("name")}
                    value={spec.label}
                    onChange={(label) => {
                      const specs = [...form.specs];
                      specs[index] = { ...spec, label };
                      update("specs", specs);
                    }}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t("value")}>
                      <Input
                        value={spec.value}
                        onChange={(e) => {
                          const specs = [...form.specs];
                          specs[index] = { ...spec, value: e.target.value };
                          update("specs", specs);
                        }}
                        className={adminFieldClass}
                      />
                    </Field>
                    <Field label={t("unit")}>
                      <Input
                        value={spec.unit ?? ""}
                        onChange={(e) => {
                          const specs = [...form.specs];
                          specs[index] = { ...spec, unit: e.target.value };
                          update("specs", specs);
                        }}
                        className={adminFieldClass}
                      />
                    </Field>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-zinc-400 hover:text-red-400"
                    onClick={() =>
                      update(
                        "specs",
                        form.specs.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2 />
                    {t("delete")}
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-white/10 text-zinc-200"
                onClick={() => update("specs", [...form.specs, emptySpec()])}
              >
                <Plus />
                {t("addSpec")}
              </Button>
            </div>
          </Section>

          <Section title={t("downloads")}>
            <div className="space-y-6">
              {form.downloads.map((file, index) => (
                <div key={file.id} className="space-y-3 rounded-xl border border-white/5 p-4">
                  <LocalizedInputs
                    label={t("name")}
                    value={file.label}
                    onChange={(label) => {
                      const downloads = [...form.downloads];
                      downloads[index] = { ...file, label };
                      update("downloads", downloads);
                    }}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={label("fileType", "File type")}>
                      <AdminSelect
                        value={file.type}
                        onValueChange={(type) => {
                          const downloads = [...form.downloads];
                          downloads[index] = {
                            ...file,
                            type: type as ProductDownload["type"],
                          };
                          update("downloads", downloads);
                        }}
                        placeholder="PDF"
                        options={[
                          { value: "pdf", label: "PDF" },
                          { value: "dwg", label: "DWG" },
                          { value: "bim", label: "BIM" },
                          { value: "3ds", label: "3DS" },
                          { value: "sketchup", label: "SketchUp" },
                          { value: "texture", label: "Texture" },
                          { value: "guide", label: "Guide" },
                        ]}
                      />
                    </Field>
                    <Field label={label("fileSize", "File size")}>
                      <Input
                        value={file.size ?? ""}
                        onChange={(e) => {
                          const downloads = [...form.downloads];
                          downloads[index] = { ...file, size: e.target.value };
                          update("downloads", downloads);
                        }}
                        className={adminFieldClass}
                        placeholder="1.2 MB"
                      />
                    </Field>
                  </div>
                  <FileUploadField
                    value={file.url}
                    accept=".pdf,.dwg,.zip,.doc,.docx,.skp,.ifc,.rfa,.3ds"
                    label={t("upload")}
                    onChange={(url, uploaded) => {
                      const downloads = [...form.downloads];
                      downloads[index] = {
                        ...file,
                        url,
                        size: uploaded ? formatBytes(uploaded.size) : file.size,
                        label: file.label.en.trim()
                          ? file.label
                          : {
                              en: uploaded?.name ?? file.label.en,
                              ru: file.label.ru,
                              am: file.label.am,
                            },
                      };
                      update("downloads", downloads);
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-zinc-400 hover:text-red-400"
                    onClick={() =>
                      update(
                        "downloads",
                        form.downloads.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2 />
                    {t("delete")}
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-white/10 text-zinc-200"
                onClick={() => update("downloads", [...form.downloads, emptyDownload()])}
              >
                <Plus />
                {label("addDownload", "Add download")}
              </Button>
            </div>
          </Section>

          <FormActions
            cancelHref="/admin/products"
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

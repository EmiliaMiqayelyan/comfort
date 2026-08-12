export function parseJson(value, fallback) {
  if (value == null) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function mapCategory(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: parseJson(row.name, { en: "", ru: "", am: "" }),
    description: parseJson(row.description, { en: "", ru: "", am: "" }),
    image: row.image,
    productCount: Number(row.product_count ?? 0),
  };
}

export function mapCollection(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: parseJson(row.name, { en: "", ru: "", am: "" }),
    description: parseJson(row.description, { en: "", ru: "", am: "" }),
    image: row.image,
    style: row.style,
    productCount: Number(row.product_count ?? 0),
  };
}

export function mapProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    name: parseJson(row.name, { en: "", ru: "", am: "" }),
    description: parseJson(row.description, { en: "", ru: "", am: "" }),
    categoryId: row.category_id,
    collectionId: row.collection_id,
    images: parseJson(row.images, []),
    modelUrl: row.model_url || undefined,
    videoUrl: row.video_url || undefined,
    height: Number(row.height),
    width: Number(row.width),
    depth: Number(row.depth),
    length: Number(row.length),
    material: row.material,
    finish: row.finish,
    colors: parseJson(row.colors, []),
    textures: parseJson(row.textures, []),
    specs: parseJson(row.specs, []),
    downloads: parseJson(row.downloads, []),
    price: Number(row.price),
    featured: Boolean(row.featured),
    availability: row.availability,
  };
}

export function mapProject(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: parseJson(row.title, { en: "", ru: "", am: "" }),
    description: parseJson(row.description, { en: "", ru: "", am: "" }),
    location: parseJson(row.location, { en: "", ru: "", am: "" }),
    year: Number(row.year),
    images: parseJson(row.images, []),
    beforeImage: row.before_image || undefined,
    afterImage: row.after_image || undefined,
    videoUrl: row.video_url || undefined,
    products: parseJson(row.product_ids, []),
    category: row.category,
  };
}

export function mapPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: parseJson(row.title, { en: "", ru: "", am: "" }),
    excerpt: parseJson(row.excerpt, { en: "", ru: "", am: "" }),
    content: parseJson(row.content, { en: "", ru: "", am: "" }),
    coverImage: row.cover_image,
    category: row.category,
    tags: parseJson(row.tags, []),
    author: parseJson(row.author, { id: "", name: "", avatar: "", role: { en: "", ru: "", am: "" } }),
    publishedAt: row.published_at instanceof Date
      ? row.published_at.toISOString().slice(0, 10)
      : String(row.published_at).slice(0, 10),
  };
}

export function mapUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    avatar: row.avatar || undefined,
  };
}

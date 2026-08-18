import {
  blogPosts as seedBlogPosts,
  categories as seedCategories,
  collections as seedCollections,
  products as seedProducts,
  projects as seedProjects,
} from "@/data/catalog";
import type {
  BlogPost,
  Certificate,
  Collection,
  ContactMessage,
  ContactSettings,
  DownloadFile,
  Product,
  ProductCategory,
  Project,
  Role,
} from "@/types";

const STORE_KEY = "comfort-mock-store-v2";
const MODE_KEY = "comfort-mock-mode";

type MockUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};

type Store = {
  products: Product[];
  categories: ProductCategory[];
  collections: Collection[];
  projects: Project[];
  blogPosts: BlogPost[];
  certificates: Certificate[];
  downloads: DownloadFile[];
  contactMessages: ContactMessage[];
  contactSettings: ContactSettings;
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function defaultStore(): Store {
  return {
    products: clone(seedProducts),
    categories: clone(seedCategories),
    collections: clone(seedCollections),
    projects: clone(seedProjects),
    blogPosts: clone(seedBlogPosts),
    certificates: [
      {
        id: "cert-iso",
        title: { en: "ISO 9001:2015", ru: "ISO 9001:2015", am: "ISO 9001:2015" },
        issuer: "ISO",
        year: 2015,
        fileUrl: "/products/plinth.png",
        image: "/products/plinth.png",
      },
    ],
    downloads: [
      {
        id: "dl-catalog",
        filename: "comfort-catalog.pdf",
        title: { en: "Comfort catalog", ru: "Каталог Comfort", am: "Comfort կատալոգ" },
        category: "catalogs",
        url: "/downloads/md101.pdf",
        size: "1.2 MB",
        downloadable: true,
      },
    ],
    contactMessages: [],
    contactSettings: {
      phones: ["+374 00 000000"],
      emails: ["info@comfort.am"],
      address: { en: "Yerevan, Armenia", ru: "Ереван, Армения", am: "Երևան, Հայաստան" },
      hours: { en: "Mon–Sat 10:00–19:00", ru: "Пн–Сб 10:00–19:00", am: "Երկ–Շբ 10:00–19:00" },
      socials: [
        { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/37400000000" },
        { id: "instagram", label: "Instagram", href: "https://instagram.com" },
      ],
      showrooms: [
        {
          id: "yerevan",
          name: "Yerevan Showroom",
          address: "15 Northern Ave, Yerevan",
          hours: "Mon–Sat 10:00–19:00",
          phone: "+374 00 000000",
        },
      ],
    },
  };
}

function loadStore(): Store {
  const defaults = defaultStore();
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Store>;
        return {
          ...defaults,
          ...parsed,
          certificates: parsed.certificates ?? defaults.certificates,
          downloads: parsed.downloads ?? defaults.downloads,
          contactMessages: parsed.contactMessages ?? defaults.contactMessages,
          contactSettings: {
            ...defaults.contactSettings,
            ...parsed.contactSettings,
          },
        };
      }
    } catch {
      /* ignore */
    }
  }
  return defaults;
}

const store: Store = loadStore();

export let mockModeActive =
  process.env.NEXT_PUBLIC_MOCK_MODE === "true" ||
  (typeof window !== "undefined" && sessionStorage.getItem(MODE_KEY) === "1");

export function enableMockMode() {
  mockModeActive = true;
  if (typeof window !== "undefined") {
    sessionStorage.setItem(MODE_KEY, "1");
  }
}

export function isMockMode() {
  return mockModeActive;
}

function persist() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
  }
}

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

function findByIdOrSlug<T extends { id: string; slug: string }>(
  items: T[],
  key: string,
) {
  return items.find((item) => item.id === key || item.slug === key) ?? null;
}

function removeById<T extends { id: string }>(items: T[], id: string) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}

const DEMO_USERS: Record<string, MockUser> = {
  "admin@comfort.am": {
    id: "mock-admin",
    name: "Admin",
    email: "admin@comfort.am",
    role: "admin",
  },
};

export function mockLogin(
  email: string,
  password: string,
): { token: string; user: MockUser } | null {
  const normalized = email.trim().toLowerCase();
  const user = DEMO_USERS[normalized];
  if (!user || password !== "admin") return null;
  return { token: "mock-jwt-token", user };
}

export const mockStore = {
  getProducts: () => [...store.products],
  getProduct: (key: string) => findByIdOrSlug(store.products, key),
  createProduct: (payload: Partial<Product>) => {
    const product = {
      ...payload,
      id: newId("p"),
      slug: payload.slug ?? "",
      sku: payload.sku ?? "",
      name: payload.name ?? { en: "", ru: "", am: "" },
      description: payload.description ?? { en: "", ru: "", am: "" },
      categoryId: payload.categoryId ?? "",
      collectionId: payload.collectionId ?? "",
      images: payload.images ?? [],
      height: payload.height ?? 0,
      width: payload.width ?? 0,
      depth: payload.depth ?? 0,
      length: payload.length ?? 0,
      material: payload.material ?? "",
      finish: payload.finish ?? "",
      colors: payload.colors ?? [],
      textures: payload.textures ?? [],
      specs: payload.specs ?? [],
      downloads: payload.downloads ?? [],
      price: payload.price ?? 0,
      availability: payload.availability ?? "in_stock",
    } as Product;
    store.products.unshift(product);
    persist();
    return product;
  },
  updateProduct: (id: string, payload: Partial<Product>) => {
    const index = store.products.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Product not found");
    store.products[index] = { ...store.products[index], ...payload, id };
    persist();
    return store.products[index];
  },
  deleteProduct: (id: string) => {
    if (!removeById(store.products, id)) throw new Error("Product not found");
    persist();
  },

  getCategories: () => [...store.categories],
  getCategory: (key: string) => findByIdOrSlug(store.categories, key),
  createCategory: (payload: Partial<ProductCategory>) => {
    const category = {
      ...payload,
      id: newId("cat"),
      slug: payload.slug ?? "",
      name: payload.name ?? { en: "", ru: "", am: "" },
      description: payload.description ?? { en: "", ru: "", am: "" },
      image: payload.image ?? "",
      parentId: payload.parentId ?? null,
      productCount: payload.productCount ?? 0,
    } as ProductCategory;
    store.categories.push(category);
    persist();
    return category;
  },
  updateCategory: (id: string, payload: Partial<ProductCategory>) => {
    const index = store.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Category not found");
    store.categories[index] = { ...store.categories[index], ...payload, id };
    persist();
    return store.categories[index];
  },
  deleteCategory: (id: string) => {
    if (!removeById(store.categories, id)) throw new Error("Category not found");
    persist();
  },

  getCollections: () => [...store.collections],
  getCollection: (key: string) => findByIdOrSlug(store.collections, key),
  createCollection: (payload: Partial<Collection>) => {
    const collection = {
      ...payload,
      id: newId("col"),
      slug: payload.slug ?? "",
      name: payload.name ?? { en: "", ru: "", am: "" },
      description: payload.description ?? { en: "", ru: "", am: "" },
      image: payload.image ?? "",
      style: payload.style ?? "",
      productCount: payload.productCount ?? 0,
    } as Collection;
    store.collections.push(collection);
    persist();
    return collection;
  },
  updateCollection: (id: string, payload: Partial<Collection>) => {
    const index = store.collections.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Collection not found");
    store.collections[index] = { ...store.collections[index], ...payload, id };
    persist();
    return store.collections[index];
  },
  deleteCollection: (id: string) => {
    if (!removeById(store.collections, id)) throw new Error("Collection not found");
    persist();
  },

  getProjects: () => [...store.projects],
  getProject: (key: string) => findByIdOrSlug(store.projects, key),
  createProject: (payload: Partial<Project>) => {
    const project = {
      ...payload,
      id: newId("proj"),
      slug: payload.slug ?? "",
      title: payload.title ?? { en: "", ru: "", am: "" },
      description: payload.description ?? { en: "", ru: "", am: "" },
      location: payload.location ?? { en: "", ru: "", am: "" },
      year: payload.year ?? new Date().getFullYear(),
      images: payload.images ?? [],
      products: payload.products ?? [],
      category: payload.category ?? "",
    } as Project;
    store.projects.unshift(project);
    persist();
    return project;
  },
  updateProject: (id: string, payload: Partial<Project>) => {
    const index = store.projects.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Project not found");
    store.projects[index] = { ...store.projects[index], ...payload, id };
    persist();
    return store.projects[index];
  },
  deleteProject: (id: string) => {
    if (!removeById(store.projects, id)) throw new Error("Project not found");
    persist();
  },

  getPosts: () => [...store.blogPosts],
  getPost: (key: string) => findByIdOrSlug(store.blogPosts, key),
  createPost: (payload: Partial<BlogPost>) => {
    const post = {
      ...payload,
      id: newId("post"),
      slug: payload.slug ?? "",
      title: payload.title ?? { en: "", ru: "", am: "" },
      excerpt: payload.excerpt ?? { en: "", ru: "", am: "" },
      content: payload.content ?? { en: "", ru: "", am: "" },
      coverImage: payload.coverImage ?? "",
      category: payload.category ?? "",
      tags: payload.tags ?? [],
      author: payload.author ?? { id: "mock", name: "Admin", avatar: "" },
      publishedAt: payload.publishedAt ?? new Date().toISOString(),
    } as BlogPost;
    store.blogPosts.unshift(post);
    persist();
    return post;
  },
  updatePost: (id: string, payload: Partial<BlogPost>) => {
    const index = store.blogPosts.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Post not found");
    store.blogPosts[index] = { ...store.blogPosts[index], ...payload, id };
    persist();
    return store.blogPosts[index];
  },
  deletePost: (id: string) => {
    if (!removeById(store.blogPosts, id)) throw new Error("Post not found");
    persist();
  },

  getUsers: (): MockUser[] => Object.values(DEMO_USERS),

  getCertificates: () => [...store.certificates],
  getCertificate: (id: string) => store.certificates.find((item) => item.id === id) ?? null,
  createCertificate: (payload: Partial<Certificate>) => {
    const item = {
      id: newId("cert"),
      title: payload.title ?? { en: "", ru: "", am: "" },
      issuer: payload.issuer ?? "",
      year: payload.year,
      fileUrl: payload.fileUrl ?? "",
      image: payload.image,
    } as Certificate;
    store.certificates.unshift(item);
    persist();
    return item;
  },
  updateCertificate: (id: string, payload: Partial<Certificate>) => {
    const index = store.certificates.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Certificate not found");
    store.certificates[index] = { ...store.certificates[index], ...payload, id };
    persist();
    return store.certificates[index];
  },
  deleteCertificate: (id: string) => {
    if (!removeById(store.certificates, id)) throw new Error("Certificate not found");
    persist();
  },

  getDownloads: (publicOnly = false) =>
    store.downloads.filter((item) => (publicOnly ? item.downloadable : true)),
  getDownload: (id: string) => store.downloads.find((item) => item.id === id) ?? null,
  createDownload: (payload: Partial<DownloadFile>) => {
    const item = {
      id: newId("dl"),
      filename: payload.filename ?? "file",
      title: payload.title ?? { en: "", ru: "", am: "" },
      category: payload.category ?? "other",
      url: payload.url ?? "",
      size: payload.size,
      downloadable: payload.downloadable ?? true,
    } as DownloadFile;
    store.downloads.unshift(item);
    persist();
    return item;
  },
  updateDownload: (id: string, payload: Partial<DownloadFile>) => {
    const index = store.downloads.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Download not found");
    store.downloads[index] = { ...store.downloads[index], ...payload, id };
    persist();
    return store.downloads[index];
  },
  deleteDownload: (id: string) => {
    if (!removeById(store.downloads, id)) throw new Error("Download not found");
    persist();
  },

  getContactMessages: () => [...store.contactMessages],
  addContactMessage: (payload: ContactMessage) => {
    store.contactMessages.unshift(payload);
    persist();
  },
  getContactSettings: () => clone(store.contactSettings),
  updateContactSettings: (payload: ContactSettings) => {
    store.contactSettings = clone(payload);
    persist();
    return store.contactSettings;
  },

  uploadFile: async (file: File) => {
    const url = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    return { id: newId("file"), name: file.name, url, size: file.size, type: file.type };
  },
};

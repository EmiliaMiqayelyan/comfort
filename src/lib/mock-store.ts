import {
  blogPosts as seedBlogPosts,
  categories as seedCategories,
  collections as seedCollections,
  products as seedProducts,
  projects as seedProjects,
} from "@/data/catalog";
import type {
  BlogPost,
  Collection,
  Product,
  ProductCategory,
  Project,
  Role,
} from "@/types";

const STORE_KEY = "comfort-mock-store";
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
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function loadStore(): Store {
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw) as Store;
    } catch {
      /* ignore */
    }
  }
  return {
    products: clone(seedProducts),
    categories: clone(seedCategories),
    collections: clone(seedCollections),
    projects: clone(seedProjects),
    blogPosts: clone(seedBlogPosts),
  };
}

let store: Store = loadStore();

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
};

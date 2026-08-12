import type {
  BlogPost,
  Collection,
  Product,
  ProductCategory,
  Project,
  Role,
} from "@/types";
import { useAuthStore } from "@/stores";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined"
    ? process.env.API_URL || "http://127.0.0.1:4000/api"
    : "/api");

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getToken() {
  if (typeof window === "undefined") return null;
  const token = useAuthStore.getState().token;
  if (token) return token;
  try {
    const raw = localStorage.getItem("comfort-auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as any;
    return parsed?.state?.token ?? parsed?.token ?? null;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    cache: init.cache ?? "no-store",
  });

  if (response.status === 204) return undefined as T;

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(data.message || "Request failed", response.status);
  }
  return data as T;
}

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    return await apiFetch<T>(path);
  } catch {
    return null;
  }
}

export const catalogApi = {
  products: () => apiGet<Product[]>("/products"),
  product: (slug: string) => apiGet<Product>(`/products/${slug}`),
  categories: () => apiGet<ProductCategory[]>("/categories"),
  category: (slug: string) => apiGet<ProductCategory>(`/categories/${slug}`),
  collections: () => apiGet<Collection[]>("/collections"),
  collection: (slug: string) => apiGet<Collection>(`/collections/${slug}`),
  projects: () => apiGet<Project[]>("/projects"),
  project: (slug: string) => apiGet<Project>(`/projects/${slug}`),
  posts: () => apiGet<BlogPost[]>("/blog"),
  post: (slug: string) => apiGet<BlogPost>(`/blog/${slug}`),
};

export const adminApi = {
  createProduct: (payload: Partial<Product>) =>
    apiFetch<Product>("/products", { method: "POST", body: JSON.stringify(payload) }),
  updateProduct: (id: string, payload: Partial<Product>) =>
    apiFetch<Product>(`/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteProduct: (id: string) =>
    apiFetch<void>(`/products/${id}`, { method: "DELETE" }),
  createCategory: (payload: Partial<ProductCategory>) =>
    apiFetch<ProductCategory>("/categories", { method: "POST", body: JSON.stringify(payload) }),
  updateCategory: (id: string, payload: Partial<ProductCategory>) =>
    apiFetch<ProductCategory>(`/categories/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteCategory: (id: string) =>
    apiFetch<void>(`/categories/${id}`, { method: "DELETE" }),
  createCollection: (payload: Partial<Collection>) =>
    apiFetch<Collection>("/collections", { method: "POST", body: JSON.stringify(payload) }),
  updateCollection: (id: string, payload: Partial<Collection>) =>
    apiFetch<Collection>(`/collections/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteCollection: (id: string) =>
    apiFetch<void>(`/collections/${id}`, { method: "DELETE" }),
  createProject: (payload: Partial<Project>) =>
    apiFetch<Project>("/projects", { method: "POST", body: JSON.stringify(payload) }),
  updateProject: (id: string, payload: Partial<Project>) =>
    apiFetch<Project>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteProject: (id: string) =>
    apiFetch<void>(`/projects/${id}`, { method: "DELETE" }),
  createPost: (payload: Partial<BlogPost>) =>
    apiFetch<BlogPost>("/blog", { method: "POST", body: JSON.stringify(payload) }),
  updatePost: (id: string, payload: Partial<BlogPost>) =>
    apiFetch<BlogPost>(`/blog/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deletePost: (id: string) =>
    apiFetch<void>(`/blog/${id}`, { method: "DELETE" }),
  users: () => apiGet<AuthUser[]>("/users"),
};

export function loginRequest(email: string, password: string) {
  return apiFetch<{ token: string; user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function sendContact(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) {
  return apiFetch<{ ok: boolean; id: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function saveCalculator(payload: {
  email?: string;
  input: unknown;
  result: unknown;
}) {
  return apiFetch<{ ok: boolean; id: string }>("/calculator", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

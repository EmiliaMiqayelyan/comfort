import type {
  BlogPost,
  Collection,
  Product,
  ProductCategory,
  Project,
  Role,
} from "@/types";
import { useAuthStore } from "@/stores";
import { enableMockMode, isMockMode, mockLogin, mockStore } from "@/lib/mock-store";

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

async function withReadFallback<T>(
  apiCall: () => Promise<T | null>,
  mockCall: () => T,
): Promise<T> {
  if (isMockMode()) return mockCall();
  const result = await apiCall();
  if (result !== null) return result;
  enableMockMode();
  return mockCall();
}

async function withWriteFallback<T>(
  apiCall: () => Promise<T>,
  mockCall: () => T,
): Promise<T> {
  if (isMockMode()) return mockCall();
  try {
    return await apiCall();
  } catch {
    enableMockMode();
    return mockCall();
  }
}

async function withWriteVoidFallback(
  apiCall: () => Promise<void>,
  mockCall: () => void,
): Promise<void> {
  if (isMockMode()) return mockCall();
  try {
    return await apiCall();
  } catch {
    enableMockMode();
    return mockCall();
  }
}

export const catalogApi = {
  products: () =>
    withReadFallback(
      () => apiGet<Product[]>("/products"),
      () => mockStore.getProducts(),
    ),
  product: (slug: string) =>
    withReadFallback(
      () => apiGet<Product>(`/products/${slug}`),
      () => mockStore.getProduct(slug),
    ),
  categories: () =>
    withReadFallback(
      () => apiGet<ProductCategory[]>("/categories"),
      () => mockStore.getCategories(),
    ),
  category: (slug: string) =>
    withReadFallback(
      () => apiGet<ProductCategory>(`/categories/${slug}`),
      () => mockStore.getCategory(slug),
    ),
  collections: () =>
    withReadFallback(
      () => apiGet<Collection[]>("/collections"),
      () => mockStore.getCollections(),
    ),
  collection: (slug: string) =>
    withReadFallback(
      () => apiGet<Collection>(`/collections/${slug}`),
      () => mockStore.getCollection(slug),
    ),
  projects: () =>
    withReadFallback(
      () => apiGet<Project[]>("/projects"),
      () => mockStore.getProjects(),
    ),
  project: (slug: string) =>
    withReadFallback(
      () => apiGet<Project>(`/projects/${slug}`),
      () => mockStore.getProject(slug),
    ),
  posts: () =>
    withReadFallback(
      () => apiGet<BlogPost[]>("/blog"),
      () => mockStore.getPosts(),
    ),
  post: (slug: string) =>
    withReadFallback(
      () => apiGet<BlogPost>(`/blog/${slug}`),
      () => mockStore.getPost(slug),
    ),
};

export const adminApi = {
  createProduct: (payload: Partial<Product>) =>
    withWriteFallback(
      () => apiFetch<Product>("/products", { method: "POST", body: JSON.stringify(payload) }),
      () => mockStore.createProduct(payload),
    ),
  updateProduct: (id: string, payload: Partial<Product>) =>
    withWriteFallback(
      () => apiFetch<Product>(`/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
      () => mockStore.updateProduct(id, payload),
    ),
  deleteProduct: (id: string) =>
    withWriteVoidFallback(
      () => apiFetch<void>(`/products/${id}`, { method: "DELETE" }),
      () => mockStore.deleteProduct(id),
    ),
  createCategory: (payload: Partial<ProductCategory>) =>
    withWriteFallback(
      () => apiFetch<ProductCategory>("/categories", { method: "POST", body: JSON.stringify(payload) }),
      () => mockStore.createCategory(payload),
    ),
  updateCategory: (id: string, payload: Partial<ProductCategory>) =>
    withWriteFallback(
      () => apiFetch<ProductCategory>(`/categories/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
      () => mockStore.updateCategory(id, payload),
    ),
  deleteCategory: (id: string) =>
    withWriteVoidFallback(
      () => apiFetch<void>(`/categories/${id}`, { method: "DELETE" }),
      () => mockStore.deleteCategory(id),
    ),
  createCollection: (payload: Partial<Collection>) =>
    withWriteFallback(
      () => apiFetch<Collection>("/collections", { method: "POST", body: JSON.stringify(payload) }),
      () => mockStore.createCollection(payload),
    ),
  updateCollection: (id: string, payload: Partial<Collection>) =>
    withWriteFallback(
      () => apiFetch<Collection>(`/collections/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
      () => mockStore.updateCollection(id, payload),
    ),
  deleteCollection: (id: string) =>
    withWriteVoidFallback(
      () => apiFetch<void>(`/collections/${id}`, { method: "DELETE" }),
      () => mockStore.deleteCollection(id),
    ),
  createProject: (payload: Partial<Project>) =>
    withWriteFallback(
      () => apiFetch<Project>("/projects", { method: "POST", body: JSON.stringify(payload) }),
      () => mockStore.createProject(payload),
    ),
  updateProject: (id: string, payload: Partial<Project>) =>
    withWriteFallback(
      () => apiFetch<Project>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
      () => mockStore.updateProject(id, payload),
    ),
  deleteProject: (id: string) =>
    withWriteVoidFallback(
      () => apiFetch<void>(`/projects/${id}`, { method: "DELETE" }),
      () => mockStore.deleteProject(id),
    ),
  createPost: (payload: Partial<BlogPost>) =>
    withWriteFallback(
      () => apiFetch<BlogPost>("/blog", { method: "POST", body: JSON.stringify(payload) }),
      () => mockStore.createPost(payload),
    ),
  updatePost: (id: string, payload: Partial<BlogPost>) =>
    withWriteFallback(
      () => apiFetch<BlogPost>(`/blog/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
      () => mockStore.updatePost(id, payload),
    ),
  deletePost: (id: string) =>
    withWriteVoidFallback(
      () => apiFetch<void>(`/blog/${id}`, { method: "DELETE" }),
      () => mockStore.deletePost(id),
    ),
  users: () =>
    withReadFallback(
      () => apiGet<AuthUser[]>("/users"),
      () => mockStore.getUsers(),
    ),
};

export async function loginRequest(email: string, password: string) {
  if (isMockMode()) {
    const mock = mockLogin(email, password);
    if (!mock) throw new ApiError("Invalid credentials", 401);
    return mock;
  }

  try {
    return await apiFetch<{ token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    const mock = mockLogin(email, password);
    if (mock) {
      enableMockMode();
      return mock;
    }
    throw new ApiError("Invalid credentials", 401);
  }
}

export function sendContact(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) {
  if (isMockMode()) {
    return Promise.resolve({ ok: true, id: "mock-contact" });
  }
  return apiFetch<{ ok: boolean; id: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  }).catch(() => {
    enableMockMode();
    return { ok: true, id: "mock-contact" };
  });
}

export function saveCalculator(payload: {
  email?: string;
  input: unknown;
  result: unknown;
}) {
  if (isMockMode()) {
    return Promise.resolve({ ok: true, id: "mock-calculator" });
  }
  return apiFetch<{ ok: boolean; id: string }>("/calculator", {
    method: "POST",
    body: JSON.stringify(payload),
  }).catch(() => {
    enableMockMode();
    return { ok: true, id: "mock-calculator" };
  });
}

export { isMockMode } from "@/lib/mock-store";

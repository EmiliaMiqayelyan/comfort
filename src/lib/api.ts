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
    type StoredAuth = { state?: { token?: string }; token?: string } | null;
    const parsed = JSON.parse(raw) as StoredAuth;
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
  const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;
  if (!isFormData && !headers.has("Content-Type") && init.body) {
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
  certificates: () =>
    withReadFallback(
      () => apiGet<Certificate[]>("/certificates"),
      () => mockStore.getCertificates(),
    ),
  certificate: (id: string) =>
    withReadFallback(
      () => apiGet<Certificate>(`/certificates/${id}`),
      () => mockStore.getCertificate(id),
    ),
  downloads: (publicOnly = false) =>
    withReadFallback(
      () => apiGet<DownloadFile[]>(`/downloads${publicOnly ? "?public=true" : ""}`),
      () => mockStore.getDownloads(publicOnly),
    ),
  download: (id: string) =>
    withReadFallback(
      () => apiGet<DownloadFile>(`/downloads/${id}`),
      () => mockStore.getDownload(id),
    ),
  contactSettings: () =>
    withReadFallback(
      () => apiGet<ContactSettings>("/settings/contact"),
      () => mockStore.getContactSettings(),
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
  createCertificate: (payload: Partial<Certificate>) =>
    withWriteFallback(
      () => apiFetch<Certificate>("/certificates", { method: "POST", body: JSON.stringify(payload) }),
      () => mockStore.createCertificate(payload),
    ),
  updateCertificate: (id: string, payload: Partial<Certificate>) =>
    withWriteFallback(
      () => apiFetch<Certificate>(`/certificates/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
      () => mockStore.updateCertificate(id, payload),
    ),
  deleteCertificate: (id: string) =>
    withWriteVoidFallback(
      () => apiFetch<void>(`/certificates/${id}`, { method: "DELETE" }),
      () => mockStore.deleteCertificate(id),
    ),
  createDownload: (payload: Partial<DownloadFile>) =>
    withWriteFallback(
      () => apiFetch<DownloadFile>("/downloads", { method: "POST", body: JSON.stringify(payload) }),
      () => mockStore.createDownload(payload),
    ),
  updateDownload: (id: string, payload: Partial<DownloadFile>) =>
    withWriteFallback(
      () => apiFetch<DownloadFile>(`/downloads/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
      () => mockStore.updateDownload(id, payload),
    ),
  deleteDownload: (id: string) =>
    withWriteVoidFallback(
      () => apiFetch<void>(`/downloads/${id}`, { method: "DELETE" }),
      () => mockStore.deleteDownload(id),
    ),
  contactMessages: () =>
    withReadFallback(
      () => apiGet<ContactMessage[]>("/contact"),
      () => mockStore.getContactMessages(),
    ),
  updateContactSettings: (payload: ContactSettings) =>
    withWriteFallback(
      () => apiFetch<ContactSettings>("/settings/contact", { method: "PUT", body: JSON.stringify(payload) }),
      () => mockStore.updateContactSettings(payload),
    ),
};

export async function uploadFile(file: File) {
  if (isMockMode()) return mockStore.uploadFile(file);
  try {
    const body = new FormData();
    body.append("file", file);
    return await apiFetch<{ id: string; name: string; url: string; size: number; type: string }>("/media", {
      method: "POST",
      body,
    });
  } catch {
    enableMockMode();
    return mockStore.uploadFile(file);
  }
}

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
    mockStore.addContactMessage({
      id: `msg-${Date.now()}`,
      ...payload,
      created_at: new Date().toISOString(),
    });
    return Promise.resolve({ ok: true, id: "mock-contact" });
  }
  return apiFetch<{ ok: boolean; id: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  }).catch(() => {
    enableMockMode();
    mockStore.addContactMessage({
      id: `msg-${Date.now()}`,
      ...payload,
      created_at: new Date().toISOString(),
    });
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

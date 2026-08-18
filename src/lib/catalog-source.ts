import { catalogApi } from "@/lib/api";
import type { BlogPost, Collection, Product, ProductCategory, Project } from "@/types";

export async function loadProducts(): Promise<Product[]> {
  return (await catalogApi.products()) ?? [];
}

export async function loadProduct(slug: string): Promise<Product | undefined> {
  return (await catalogApi.product(slug)) ?? undefined;
}

export async function loadCategories(): Promise<ProductCategory[]> {
  return (await catalogApi.categories()) ?? [];
}

export async function loadCategory(slug: string): Promise<ProductCategory | undefined> {
  return (await catalogApi.category(slug)) ?? undefined;
}

export async function loadCollections(): Promise<Collection[]> {
  return (await catalogApi.collections()) ?? [];
}

export async function loadCollection(slug: string): Promise<Collection | undefined> {
  return (await catalogApi.collection(slug)) ?? undefined;
}

export async function loadProjects(): Promise<Project[]> {
  return (await catalogApi.projects()) ?? [];
}

export async function loadProject(slug: string): Promise<Project | undefined> {
  return (await catalogApi.project(slug)) ?? undefined;
}

export async function loadPosts(): Promise<BlogPost[]> {
  return (await catalogApi.posts()) ?? [];
}

export async function loadPost(slug: string): Promise<BlogPost | undefined> {
  return (await catalogApi.post(slug)) ?? undefined;
}

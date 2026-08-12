import {
  blogPosts,
  categories as mockCategories,
  collections as mockCollections,
  getBlogPostBySlug,
  getCategoryBySlug,
  getCollectionBySlug,
  getProductBySlug,
  getProjectBySlug,
  products as mockProducts,
  projects as mockProjects,
} from "@/data/catalog";
import { catalogApi } from "@/lib/api";
import type { BlogPost, Collection, Product, ProductCategory, Project } from "@/types";

export async function loadProducts(): Promise<Product[]> {
  return (await catalogApi.products()) ?? mockProducts;
}

export async function loadProduct(slug: string): Promise<Product | undefined> {
  return (await catalogApi.product(slug)) ?? getProductBySlug(slug);
}

export async function loadCategories(): Promise<ProductCategory[]> {
  return (await catalogApi.categories()) ?? mockCategories;
}

export async function loadCategory(slug: string): Promise<ProductCategory | undefined> {
  return (await catalogApi.category(slug)) ?? getCategoryBySlug(slug);
}

export async function loadCollections(): Promise<Collection[]> {
  return (await catalogApi.collections()) ?? mockCollections;
}

export async function loadCollection(slug: string): Promise<Collection | undefined> {
  return (await catalogApi.collection(slug)) ?? getCollectionBySlug(slug);
}

export async function loadProjects(): Promise<Project[]> {
  return (await catalogApi.projects()) ?? mockProjects;
}

export async function loadProject(slug: string): Promise<Project | undefined> {
  return (await catalogApi.project(slug)) ?? getProjectBySlug(slug);
}

export async function loadPosts(): Promise<BlogPost[]> {
  return (await catalogApi.posts()) ?? blogPosts;
}

export async function loadPost(slug: string): Promise<BlogPost | undefined> {
  return (await catalogApi.post(slug)) ?? getBlogPostBySlug(slug);
}

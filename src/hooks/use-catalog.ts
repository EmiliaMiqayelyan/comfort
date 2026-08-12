"use client";

import { useQuery } from "@tanstack/react-query";
import {
  blogPosts,
  categories as mockCategories,
  collections as mockCollections,
  products as mockProducts,
  projects as mockProjects,
} from "@/data/catalog";
import { catalogApi } from "@/lib/api";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => (await catalogApi.products()) ?? mockProducts,
    staleTime: 30_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await catalogApi.categories()) ?? mockCategories,
    staleTime: 30_000,
  });
}

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => (await catalogApi.collections()) ?? mockCollections,
    staleTime: 30_000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => (await catalogApi.projects()) ?? mockProjects,
    staleTime: 30_000,
  });
}

export function usePosts() {
  return useQuery({
    queryKey: ["blog"],
    queryFn: async () => (await catalogApi.posts()) ?? blogPosts,
    staleTime: 30_000,
  });
}

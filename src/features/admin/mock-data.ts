import type { MediaAsset, Role } from "@/types";

export const mockProducts = [
  { id: "1", name: "MD-101 Baseboard", sku: "MD-101", category: "Baseboards", status: "published", updated: "2026-08-04" },
  { id: "2", name: "Wave Panel WP-42", sku: "WP-42", category: "Wall panels", status: "published", updated: "2026-08-03" },
  { id: "3", name: "Classic Molding CM-08", sku: "CM-08", category: "Moldings", status: "draft", updated: "2026-08-01" },
  { id: "4", name: "LED Profile LP-22", sku: "LP-22", category: "Profiles", status: "published", updated: "2026-07-28" },
  { id: "5", name: "Corner Connector CC-01", sku: "CC-01", category: "Accessories", status: "published", updated: "2026-07-25" },
];

export const mockCategories = [
  { id: "1", name: "Baseboards", slug: "baseboards", products: 24, status: "published" },
  { id: "2", name: "Wall panels", slug: "wall-panels", products: 18, status: "published" },
  { id: "3", name: "Moldings", slug: "moldings", products: 12, status: "published" },
  { id: "4", name: "Profiles", slug: "profiles", products: 9, status: "draft" },
];

export const mockCollections = [
  { id: "1", name: "Modern", slug: "modern", products: 14, style: "Contemporary" },
  { id: "2", name: "Classic", slug: "classic", products: 11, style: "Traditional" },
  { id: "3", name: "Minimal", slug: "minimal", products: 8, style: "Scandinavian" },
];

export const mockProjects = [
  { id: "1", title: "Yerevan Residence", location: "Yerevan", year: 2025, status: "published" },
  { id: "2", title: "Lake Sevan Villa", location: "Sevan", year: 2024, status: "published" },
  { id: "3", title: "Office Tower Lobby", location: "Gyumri", year: 2024, status: "draft" },
];

export const mockBlogPosts = [
  { id: "1", title: "Choosing the right baseboard height", author: "Anna S.", status: "published", date: "2026-08-02" },
  { id: "2", title: "3D panels in modern interiors", author: "David K.", status: "published", date: "2026-07-20" },
  { id: "3", title: "Installation best practices", author: "Anna S.", status: "draft", date: "2026-07-15" },
];

export const mockDownloads = [
  { id: "1", name: "Product Catalog 2026", type: "PDF", size: "12.4 MB", downloads: 842 },
  { id: "2", name: "MD-101 Technical Sheet", type: "PDF", size: "1.2 MB", downloads: 356 },
  { id: "3", name: "Baseboard DWG Pack", type: "DWG", size: "8.6 MB", downloads: 128 },
];

export const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@comfort.am", role: "admin" as Role, lastActive: "2026-08-06" },
  { id: "2", name: "Content Editor", email: "editor@comfort.am", role: "editor" as Role, lastActive: "2026-08-05" },
  { id: "3", name: "Translator", email: "translator@comfort.am", role: "translator" as Role, lastActive: "2026-08-04" },
  { id: "4", name: "Dealer Partner", email: "dealer@comfort.am", role: "dealer" as Role, lastActive: "2026-08-03" },
];

export const mockMedia: MediaAsset[] = [
  { id: "1", name: "hero-living-room.jpg", type: "image", url: "/media/hero.jpg", folder: "homepage", size: 2400000, createdAt: "2026-08-01" },
  { id: "2", name: "md101-model.glb", type: "glb", url: "/media/md101.glb", folder: "models", size: 8900000, createdAt: "2026-07-28" },
  { id: "3", name: "catalog-2026.pdf", type: "pdf", url: "/media/catalog.pdf", folder: "downloads", size: 12400000, createdAt: "2026-07-20" },
  { id: "4", name: "wave-panel.usdz", type: "usdz", url: "/media/wave.usdz", folder: "models", size: 5600000, createdAt: "2026-07-15" },
  { id: "5", name: "matte-texture.jpg", type: "texture", url: "/media/matte.jpg", folder: "textures", size: 890000, createdAt: "2026-07-10" },
  { id: "6", name: "factory-tour.mp4", type: "video", url: "/media/factory.mp4", folder: "videos", size: 45000000, createdAt: "2026-07-05" },
];

export const mockModels = [
  { id: "1", name: "MD-101 Baseboard", format: "GLB", size: "8.9 MB", linkedProduct: "MD-101" },
  { id: "2", name: "Wave Panel WP-42", format: "GLB + USDZ", size: "14.2 MB", linkedProduct: "WP-42" },
  { id: "3", name: "Classic Molding CM-08", format: "GLB", size: "6.1 MB", linkedProduct: "CM-08" },
];

export const mockCertificates = [
  { id: "1", name: "ISO 9001:2015", issuer: "TÜV", status: "published", updated: "2026-01-12" },
  { id: "2", name: "CE Marking", issuer: "EU", status: "published", updated: "2025-11-03" },
  { id: "3", name: "Eco Material Certificate", issuer: "GreenLab", status: "draft", updated: "2026-06-18" },
];

export const mockColors = [
  { id: "1", name: "Polar White", hex: "#F7F7F4", status: "published" },
  { id: "2", name: "Anthracite", hex: "#2B2F36", status: "published" },
  { id: "3", name: "Natural Oak", hex: "#B8A07E", status: "published" },
];

export const mockMaterials = [
  { id: "1", name: "HD Polymer", density: "High", status: "published" },
  { id: "2", name: "MDF / Polymer", density: "Medium", status: "published" },
  { id: "3", name: "Aluminum", density: "Light", status: "draft" },
];

export const mockTextures = [
  { id: "1", name: "Matte", map: "matte.jpg", status: "published" },
  { id: "2", name: "Satin", map: "satin.jpg", status: "published" },
  { id: "3", name: "Wood Grain", map: "oak.jpg", status: "draft" },
];

export const mockMenus = [
  { id: "1", name: "Main navigation", items: "6", locale: "all", status: "published" },
  { id: "2", name: "Footer products", items: "4", locale: "all", status: "published" },
  { id: "3", name: "Footer legal", items: "3", locale: "all", status: "published" },
];

export const mockRoles = [
  { id: "1", name: "Admin", users: "2", permissions: "Full access" },
  { id: "2", name: "Manager", users: "3", permissions: "Content + SEO" },
  { id: "3", name: "Editor", users: "5", permissions: "Content only" },
  { id: "4", name: "Translator", users: "2", permissions: "Languages" },
  { id: "5", name: "Dealer", users: "12", permissions: "Products + Downloads" },
];

export const mockCalculatorSettings = [
  { id: "1", name: "Default waste %", value: "8", status: "published" },
  { id: "2", name: "Piece length (m)", value: "2.4", status: "published" },
  { id: "3", name: "Adhesive factor", value: "0.12", status: "published" },
];

export const mockVisualizerAssets = [
  { id: "1", name: "Warm Living preset", type: "Room", status: "published" },
  { id: "2", name: "White Gallery preset", type: "Room", status: "published" },
  { id: "3", name: "Baseboard overlay pack", type: "Overlay", status: "draft" },
];

export const mockLanguages = [
  { id: "en", name: "English", code: "en", enabled: true, default: true },
  { id: "ru", name: "Русский", code: "ru", enabled: true, default: false },
  { id: "am", name: "Հայերեն", code: "am", enabled: true, default: false },
];

export const mockRecentActivity = [
  { id: "1", action: "Product updated", target: "MD-101 Baseboard", user: "editor@comfort.am", time: "2 hours ago" },
  { id: "2", action: "Media uploaded", target: "hero-living-room.jpg", user: "admin@comfort.am", time: "5 hours ago" },
  { id: "3", action: "Blog published", target: "Choosing the right baseboard height", user: "editor@comfort.am", time: "1 day ago" },
  { id: "4", action: "User created", target: "dealer@comfort.am", user: "admin@comfort.am", time: "2 days ago" },
  { id: "5", action: "SEO updated", target: "Homepage meta", user: "admin@comfort.am", time: "3 days ago" },
];

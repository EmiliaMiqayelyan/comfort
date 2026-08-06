import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Home,
  Package,
  FolderTree,
  Layers,
  Building2,
  Newspaper,
  Image,
  Download,
  Award,
  Palette,
  Box,
  Shapes,
  BoxIcon,
  Calculator,
  Eye,
  Languages,
  Search,
  Menu,
  Users,
  Shield,
} from "lucide-react";
import type { Role } from "@/types";

export interface AdminNavItem {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  roles: Role[];
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", labelKey: "dashboard", icon: LayoutDashboard, roles: ["admin", "manager", "editor", "translator"] },
  { href: "/admin/homepage", labelKey: "homepage", icon: Home, roles: ["admin", "manager", "editor"] },
  { href: "/admin/products", labelKey: "products", icon: Package, roles: ["admin", "manager", "editor", "translator", "dealer"] },
  { href: "/admin/categories", labelKey: "categories", icon: FolderTree, roles: ["admin", "manager", "editor"] },
  { href: "/admin/collections", labelKey: "collections", icon: Layers, roles: ["admin", "manager", "editor"] },
  { href: "/admin/projects", labelKey: "projects", icon: Building2, roles: ["admin", "manager", "editor"] },
  { href: "/admin/blog", labelKey: "blog", icon: Newspaper, roles: ["admin", "manager", "editor", "translator"] },
  { href: "/admin/media", labelKey: "media", icon: Image, roles: ["admin", "manager", "editor"] },
  { href: "/admin/downloads", labelKey: "downloads", icon: Download, roles: ["admin", "manager", "editor", "dealer"] },
  { href: "/admin/certificates", labelKey: "certificates", icon: Award, roles: ["admin", "manager", "editor"] },
  { href: "/admin/colors", labelKey: "colors", icon: Palette, roles: ["admin", "manager", "editor"] },
  { href: "/admin/materials", labelKey: "materials", icon: Box, roles: ["admin", "manager", "editor"] },
  { href: "/admin/textures", labelKey: "textures", icon: Shapes, roles: ["admin", "manager", "editor"] },
  { href: "/admin/models", labelKey: "models", icon: BoxIcon, roles: ["admin", "manager", "editor"] },
  { href: "/admin/calculator", labelKey: "calculator", icon: Calculator, roles: ["admin", "manager"] },
  { href: "/admin/visualizer", labelKey: "visualizer", icon: Eye, roles: ["admin", "manager"] },
  { href: "/admin/languages", labelKey: "languages", icon: Languages, roles: ["admin", "manager", "translator"] },
  { href: "/admin/seo", labelKey: "seo", icon: Search, roles: ["admin", "manager"] },
  { href: "/admin/menus", labelKey: "menus", icon: Menu, roles: ["admin", "manager"] },
  { href: "/admin/users", labelKey: "users", icon: Users, roles: ["admin", "manager"] },
  { href: "/admin/roles", labelKey: "roles", icon: Shield, roles: ["admin"] },
];

export function getNavForRole(role: Role): AdminNavItem[] {
  return adminNavItems.filter((item) => item.roles.includes(role));
}

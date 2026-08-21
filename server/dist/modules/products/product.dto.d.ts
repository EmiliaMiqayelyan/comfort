import { z } from 'zod';
export declare const createProductDto: z.ZodObject<{
    slug: z.ZodString;
    sku: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ru: z.ZodDefault<z.ZodString>;
        am: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ru: string;
        am: string;
    }, {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    }>;
    description: z.ZodOptional<z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ru: z.ZodDefault<z.ZodString>;
        am: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ru: string;
        am: string;
    }, {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    }>>;
    categoryId: z.ZodString;
    collectionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    modelUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    videoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    height: z.ZodDefault<z.ZodNumber>;
    width: z.ZodDefault<z.ZodNumber>;
    depth: z.ZodDefault<z.ZodNumber>;
    length: z.ZodDefault<z.ZodNumber>;
    material: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finish: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    colors: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    textures: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    specs: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    downloads: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    price: z.ZodDefault<z.ZodNumber>;
    featured: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNumber]>>;
    availability: z.ZodDefault<z.ZodEnum<["in_stock", "limited", "preorder"]>>;
}, "strip", z.ZodTypeAny, {
    length: number;
    name: {
        en: string;
        ru: string;
        am: string;
    };
    slug: string;
    sku: string;
    categoryId: string;
    height: number;
    width: number;
    depth: number;
    price: number;
    availability: "in_stock" | "limited" | "preorder";
    description?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    collectionId?: string | null | undefined;
    images?: string[] | undefined;
    modelUrl?: string | null | undefined;
    videoUrl?: string | null | undefined;
    material?: string | null | undefined;
    finish?: string | null | undefined;
    colors?: unknown[] | undefined;
    textures?: unknown[] | undefined;
    specs?: unknown[] | undefined;
    downloads?: unknown[] | undefined;
    featured?: number | boolean | undefined;
}, {
    name: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    };
    slug: string;
    sku: string;
    categoryId: string;
    length?: number | undefined;
    description?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    collectionId?: string | null | undefined;
    images?: string[] | undefined;
    modelUrl?: string | null | undefined;
    videoUrl?: string | null | undefined;
    height?: number | undefined;
    width?: number | undefined;
    depth?: number | undefined;
    material?: string | null | undefined;
    finish?: string | null | undefined;
    colors?: unknown[] | undefined;
    textures?: unknown[] | undefined;
    specs?: unknown[] | undefined;
    downloads?: unknown[] | undefined;
    price?: number | undefined;
    featured?: number | boolean | undefined;
    availability?: "in_stock" | "limited" | "preorder" | undefined;
}>;
export declare const updateProductDto: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    sku: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ru: z.ZodDefault<z.ZodString>;
        am: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ru: string;
        am: string;
    }, {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    }>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ru: z.ZodDefault<z.ZodString>;
        am: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ru: string;
        am: string;
    }, {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    }>>>;
    categoryId: z.ZodOptional<z.ZodString>;
    collectionId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    images: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    modelUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    videoUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    height: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    width: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    depth: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    length: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    material: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    finish: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    colors: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>>;
    textures: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>>;
    specs: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>>;
    downloads: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>>;
    price: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    featured: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNumber]>>>;
    availability: z.ZodOptional<z.ZodDefault<z.ZodEnum<["in_stock", "limited", "preorder"]>>>;
}, "strip", z.ZodTypeAny, {
    length?: number | undefined;
    name?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    slug?: string | undefined;
    description?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    sku?: string | undefined;
    categoryId?: string | undefined;
    collectionId?: string | null | undefined;
    images?: string[] | undefined;
    modelUrl?: string | null | undefined;
    videoUrl?: string | null | undefined;
    height?: number | undefined;
    width?: number | undefined;
    depth?: number | undefined;
    material?: string | null | undefined;
    finish?: string | null | undefined;
    colors?: unknown[] | undefined;
    textures?: unknown[] | undefined;
    specs?: unknown[] | undefined;
    downloads?: unknown[] | undefined;
    price?: number | undefined;
    featured?: number | boolean | undefined;
    availability?: "in_stock" | "limited" | "preorder" | undefined;
}, {
    length?: number | undefined;
    name?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    slug?: string | undefined;
    description?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    sku?: string | undefined;
    categoryId?: string | undefined;
    collectionId?: string | null | undefined;
    images?: string[] | undefined;
    modelUrl?: string | null | undefined;
    videoUrl?: string | null | undefined;
    height?: number | undefined;
    width?: number | undefined;
    depth?: number | undefined;
    material?: string | null | undefined;
    finish?: string | null | undefined;
    colors?: unknown[] | undefined;
    textures?: unknown[] | undefined;
    specs?: unknown[] | undefined;
    downloads?: unknown[] | undefined;
    price?: number | undefined;
    featured?: number | boolean | undefined;
    availability?: "in_stock" | "limited" | "preorder" | undefined;
}>;
//# sourceMappingURL=product.dto.d.ts.map
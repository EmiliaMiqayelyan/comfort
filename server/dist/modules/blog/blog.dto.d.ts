import { z } from 'zod';
export declare const createBlogDto: z.ZodObject<{
    slug: z.ZodString;
    title: z.ZodObject<{
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
    excerpt: z.ZodOptional<z.ZodObject<{
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
    content: z.ZodOptional<z.ZodObject<{
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
    coverImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    author: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    publishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    title: {
        en: string;
        ru: string;
        am: string;
    };
    category?: string | null | undefined;
    excerpt?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    content?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    coverImage?: string | null | undefined;
    tags?: string[] | undefined;
    author?: Record<string, unknown> | null | undefined;
    publishedAt?: string | null | undefined;
}, {
    slug: string;
    title: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    };
    category?: string | null | undefined;
    excerpt?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    content?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    coverImage?: string | null | undefined;
    tags?: string[] | undefined;
    author?: Record<string, unknown> | null | undefined;
    publishedAt?: string | null | undefined;
}>;
export declare const updateBlogDto: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodObject<{
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
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodObject<{
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
    content: z.ZodOptional<z.ZodOptional<z.ZodObject<{
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
    coverImage: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    author: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>>;
    publishedAt: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    slug?: string | undefined;
    title?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    category?: string | null | undefined;
    excerpt?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    content?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    coverImage?: string | null | undefined;
    tags?: string[] | undefined;
    author?: Record<string, unknown> | null | undefined;
    publishedAt?: string | null | undefined;
}, {
    slug?: string | undefined;
    title?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    category?: string | null | undefined;
    excerpt?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    content?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    coverImage?: string | null | undefined;
    tags?: string[] | undefined;
    author?: Record<string, unknown> | null | undefined;
    publishedAt?: string | null | undefined;
}>;
//# sourceMappingURL=blog.dto.d.ts.map
import { z } from 'zod';
export declare const createProjectDto: z.ZodObject<{
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
    location: z.ZodOptional<z.ZodObject<{
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
    year: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    beforeImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    afterImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    videoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    productIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    title: {
        en: string;
        ru: string;
        am: string;
    };
    description?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    images?: string[] | undefined;
    videoUrl?: string | null | undefined;
    location?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    year?: number | null | undefined;
    beforeImage?: string | null | undefined;
    afterImage?: string | null | undefined;
    productIds?: string[] | undefined;
    category?: string | null | undefined;
}, {
    slug: string;
    title: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    };
    description?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    images?: string[] | undefined;
    videoUrl?: string | null | undefined;
    location?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    year?: number | null | undefined;
    beforeImage?: string | null | undefined;
    afterImage?: string | null | undefined;
    productIds?: string[] | undefined;
    category?: string | null | undefined;
}>;
export declare const updateProjectDto: z.ZodObject<{
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
    location: z.ZodOptional<z.ZodOptional<z.ZodObject<{
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
    year: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    images: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    beforeImage: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    afterImage: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    videoUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    productIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    slug?: string | undefined;
    description?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    images?: string[] | undefined;
    videoUrl?: string | null | undefined;
    title?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    location?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    year?: number | null | undefined;
    beforeImage?: string | null | undefined;
    afterImage?: string | null | undefined;
    productIds?: string[] | undefined;
    category?: string | null | undefined;
}, {
    slug?: string | undefined;
    description?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    images?: string[] | undefined;
    videoUrl?: string | null | undefined;
    title?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    location?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    year?: number | null | undefined;
    beforeImage?: string | null | undefined;
    afterImage?: string | null | undefined;
    productIds?: string[] | undefined;
    category?: string | null | undefined;
}>;
//# sourceMappingURL=project.dto.d.ts.map
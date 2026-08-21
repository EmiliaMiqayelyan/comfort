import { z } from 'zod';
export declare const createCollectionDto: z.ZodObject<{
    slug: z.ZodString;
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
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    style: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: {
        en: string;
        ru: string;
        am: string;
    };
    slug: string;
    description?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    image?: string | null | undefined;
    style?: string | null | undefined;
}, {
    name: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    };
    slug: string;
    description?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    image?: string | null | undefined;
    style?: string | null | undefined;
}>;
export declare const updateCollectionDto: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
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
    image: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    style: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
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
    image?: string | null | undefined;
    style?: string | null | undefined;
}, {
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
    image?: string | null | undefined;
    style?: string | null | undefined;
}>;
//# sourceMappingURL=collection.dto.d.ts.map
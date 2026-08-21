import { z } from 'zod';
export declare const createDownloadDto: z.ZodObject<{
    filename: z.ZodString;
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
    category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    url: z.ZodString;
    fileSize: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    downloadable: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    title: {
        en: string;
        ru: string;
        am: string;
    };
    url: string;
    filename: string;
    downloadable: number | boolean;
    category?: string | null | undefined;
    fileSize?: string | null | undefined;
}, {
    title: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    };
    url: string;
    filename: string;
    category?: string | null | undefined;
    fileSize?: string | null | undefined;
    downloadable?: number | boolean | undefined;
}>;
export declare const updateDownloadDto: z.ZodObject<{
    filename: z.ZodOptional<z.ZodString>;
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
    category: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    url: z.ZodOptional<z.ZodString>;
    fileSize: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    downloadable: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNumber]>>>;
}, "strip", z.ZodTypeAny, {
    title?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    category?: string | null | undefined;
    url?: string | undefined;
    filename?: string | undefined;
    fileSize?: string | null | undefined;
    downloadable?: number | boolean | undefined;
}, {
    title?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    category?: string | null | undefined;
    url?: string | undefined;
    filename?: string | undefined;
    fileSize?: string | null | undefined;
    downloadable?: number | boolean | undefined;
}>;
//# sourceMappingURL=download.dto.d.ts.map
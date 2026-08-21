import { z } from 'zod';
export declare const createCertificateDto: z.ZodObject<{
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
    issuer: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    year: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    fileUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    title: {
        en: string;
        ru: string;
        am: string;
    };
    image?: string | null | undefined;
    year?: number | null | undefined;
    issuer?: string | null | undefined;
    fileUrl?: string | null | undefined;
}, {
    title: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    };
    image?: string | null | undefined;
    year?: number | null | undefined;
    issuer?: string | null | undefined;
    fileUrl?: string | null | undefined;
}>;
export declare const updateCertificateDto: z.ZodObject<{
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
    issuer: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    year: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    fileUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    image?: string | null | undefined;
    title?: {
        en: string;
        ru: string;
        am: string;
    } | undefined;
    year?: number | null | undefined;
    issuer?: string | null | undefined;
    fileUrl?: string | null | undefined;
}, {
    image?: string | null | undefined;
    title?: {
        en?: string | undefined;
        ru?: string | undefined;
        am?: string | undefined;
    } | undefined;
    year?: number | null | undefined;
    issuer?: string | null | undefined;
    fileUrl?: string | null | undefined;
}>;
//# sourceMappingURL=certificate.dto.d.ts.map
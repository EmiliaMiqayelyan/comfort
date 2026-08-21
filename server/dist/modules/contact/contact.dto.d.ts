import { z } from 'zod';
export declare const createContactDto: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    email: string;
    name: string;
    phone?: string | null | undefined;
    company?: string | null | undefined;
}, {
    message: string;
    email: string;
    name: string;
    phone?: string | null | undefined;
    company?: string | null | undefined;
}>;
//# sourceMappingURL=contact.dto.d.ts.map
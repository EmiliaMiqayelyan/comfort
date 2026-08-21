import { z } from 'zod';
export declare const localizedSchema: z.ZodObject<{
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
export type Localized = z.infer<typeof localizedSchema>;
export declare function fillLocalized(data: Partial<Localized>): Localized;
//# sourceMappingURL=localized.d.ts.map
import { z } from 'zod';
export declare const createCalculatorDto: z.ZodObject<{
    userEmail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    inputJson: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    resultJson: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    inputJson: Record<string, unknown>;
    resultJson: Record<string, unknown>;
    userEmail?: string | null | undefined;
}, {
    inputJson: Record<string, unknown>;
    resultJson: Record<string, unknown>;
    userEmail?: string | null | undefined;
}>;
//# sourceMappingURL=calculator.dto.d.ts.map
import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    PORT: z.ZodDefault<z.ZodNumber>;
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    CLIENT_ORIGIN: z.ZodDefault<z.ZodString>;
    MYSQL_HOST: z.ZodDefault<z.ZodString>;
    MYSQL_PORT: z.ZodDefault<z.ZodNumber>;
    MYSQL_USER: z.ZodDefault<z.ZodString>;
    MYSQL_PASSWORD: z.ZodDefault<z.ZodString>;
    MYSQL_DATABASE: z.ZodDefault<z.ZodString>;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    CLIENT_ORIGIN: string;
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
}, {
    JWT_SECRET: string;
    PORT?: number | undefined;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    CLIENT_ORIGIN?: string | undefined;
    MYSQL_HOST?: string | undefined;
    MYSQL_PORT?: number | undefined;
    MYSQL_USER?: string | undefined;
    MYSQL_PASSWORD?: string | undefined;
    MYSQL_DATABASE?: string | undefined;
    JWT_EXPIRES_IN?: string | undefined;
}>;
export declare const config: {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    CLIENT_ORIGIN: string;
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
};
export type Config = z.infer<typeof envSchema>;
export {};
//# sourceMappingURL=config.d.ts.map
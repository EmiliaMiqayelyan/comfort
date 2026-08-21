export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;
    constructor(message: string, statusCode?: number, code?: string);
    static notFound(message?: string): AppError;
    static unauthorized(message?: string): AppError;
    static forbidden(message?: string): AppError;
}
//# sourceMappingURL=AppError.d.ts.map
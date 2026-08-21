"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    code;
    constructor(message, statusCode = 400, code = 'BAD_REQUEST') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        Object.setPrototypeOf(this, AppError.prototype);
    }
    static notFound(message = 'Not found') {
        return new AppError(message, 404, 'NOT_FOUND');
    }
    static unauthorized(message = 'Unauthorized') {
        return new AppError(message, 401, 'UNAUTHORIZED');
    }
    static forbidden(message = 'Forbidden') {
        return new AppError(message, 403, 'FORBIDDEN');
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map
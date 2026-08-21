"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const AppError_1 = require("../../shared/errors/AppError");
function errorHandler(err, _req, res, _next) {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({ error: err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ') });
        return;
    }
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[ERROR]', err);
    res.status(500).json({ error: message });
}
//# sourceMappingURL=error.middleware.js.map
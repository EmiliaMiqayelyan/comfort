"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const AppError_1 = require("../../shared/errors/AppError");
function requireAuth(req, _res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        throw AppError_1.AppError.unauthorized('Missing or invalid token');
    }
    const token = header.slice(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
        req.user = { id: payload.id, email: payload.email, name: payload.name, role: payload.role };
        next();
    }
    catch {
        throw AppError_1.AppError.unauthorized('Invalid or expired token');
    }
}
function requireRole(...roles) {
    return (req, _res, next) => {
        if (!req.user)
            throw AppError_1.AppError.unauthorized();
        if (!roles.includes(req.user.role))
            throw AppError_1.AppError.forbidden('Insufficient permissions');
        next();
    };
}
//# sourceMappingURL=auth.middleware.js.map
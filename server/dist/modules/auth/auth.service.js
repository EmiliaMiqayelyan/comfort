"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../app/config/config");
const models_1 = require("../../shared/database/models");
const AppError_1 = require("../../shared/errors/AppError");
class AuthService {
    async login(dto) {
        const user = await models_1.User.findOne({ where: { email: dto.email } });
        if (!user)
            throw new AppError_1.AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
        const valid = await bcryptjs_1.default.compare(dto.password, user.passwordHash);
        if (!valid)
            throw new AppError_1.AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, config_1.config.JWT_SECRET, { expiresIn: config_1.config.JWT_EXPIRES_IN });
        return {
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
        };
    }
    async me(userId) {
        const user = await models_1.User.findByPk(userId, {
            attributes: { exclude: ['passwordHash'] },
        });
        if (!user)
            throw AppError_1.AppError.notFound('User not found');
        return user;
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map
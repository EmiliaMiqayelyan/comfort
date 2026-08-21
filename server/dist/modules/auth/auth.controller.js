"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
class AuthController {
    async login(req, res) {
        const data = auth_dto_1.loginDto.parse(req.body);
        const result = await auth_service_1.authService.login(data);
        res.json(result);
    }
    async me(req, res) {
        const user = await auth_service_1.authService.me(req.user.id);
        res.json(user);
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map
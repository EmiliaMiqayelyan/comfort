"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.post('/login', (req, res) => auth_controller_1.authController.login(req, res));
router.get('/me', auth_middleware_1.requireAuth, (req, res) => auth_controller_1.authController.me(req, res));
//# sourceMappingURL=auth.routes.js.map
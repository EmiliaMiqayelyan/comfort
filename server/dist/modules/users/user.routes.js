"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.userRoutes = router;
router.get('/', auth_middleware_1.requireAuth, (req, res) => user_controller_1.userController.list(req, res));
//# sourceMappingURL=user.routes.js.map
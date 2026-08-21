"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoutes = void 0;
const express_1 = require("express");
const contact_controller_1 = require("./contact.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.contactRoutes = router;
router.post('/', (req, res) => contact_controller_1.contactController.create(req, res));
router.get('/', auth_middleware_1.requireAuth, (req, res) => contact_controller_1.contactController.list(req, res));
//# sourceMappingURL=contact.routes.js.map
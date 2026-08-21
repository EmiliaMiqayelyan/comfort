"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRoutes = void 0;
const express_1 = require("express");
const settings_controller_1 = require("./settings.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.settingsRoutes = router;
router.get('/contact', (req, res) => settings_controller_1.settingsController.getContact(req, res));
router.put('/contact', auth_middleware_1.requireAuth, (req, res) => settings_controller_1.settingsController.updateContact(req, res));
//# sourceMappingURL=settings.routes.js.map
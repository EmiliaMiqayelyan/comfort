"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificateRoutes = void 0;
const express_1 = require("express");
const certificate_controller_1 = require("./certificate.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.certificateRoutes = router;
router.get('/', (req, res) => certificate_controller_1.certificateController.list(req, res));
router.get('/:id', (req, res) => certificate_controller_1.certificateController.getOne(req, res));
router.post('/', auth_middleware_1.requireAuth, (req, res) => certificate_controller_1.certificateController.create(req, res));
router.put('/:id', auth_middleware_1.requireAuth, (req, res) => certificate_controller_1.certificateController.update(req, res));
router.delete('/:id', auth_middleware_1.requireAuth, (req, res) => certificate_controller_1.certificateController.delete(req, res));
//# sourceMappingURL=certificate.routes.js.map
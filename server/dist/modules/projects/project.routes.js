"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.projectRoutes = router;
router.get('/', (req, res) => project_controller_1.projectController.list(req, res));
router.get('/:slug', (req, res) => project_controller_1.projectController.getOne(req, res));
router.post('/', auth_middleware_1.requireAuth, (req, res) => project_controller_1.projectController.create(req, res));
router.put('/:id', auth_middleware_1.requireAuth, (req, res) => project_controller_1.projectController.update(req, res));
router.delete('/:id', auth_middleware_1.requireAuth, (req, res) => project_controller_1.projectController.delete(req, res));
//# sourceMappingURL=project.routes.js.map
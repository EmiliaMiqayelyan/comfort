"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.categoryRoutes = router;
router.get('/', (req, res) => category_controller_1.categoryController.list(req, res));
router.get('/:slug', (req, res) => category_controller_1.categoryController.getOne(req, res));
router.post('/', auth_middleware_1.requireAuth, (req, res) => category_controller_1.categoryController.create(req, res));
router.put('/:id', auth_middleware_1.requireAuth, (req, res) => category_controller_1.categoryController.update(req, res));
router.delete('/:id', auth_middleware_1.requireAuth, (req, res) => category_controller_1.categoryController.delete(req, res));
//# sourceMappingURL=category.routes.js.map
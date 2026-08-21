"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.productRoutes = router;
router.get('/', (req, res) => product_controller_1.productController.list(req, res));
router.get('/:slug', (req, res) => product_controller_1.productController.getOne(req, res));
router.post('/', auth_middleware_1.requireAuth, (req, res) => product_controller_1.productController.create(req, res));
router.put('/:id', auth_middleware_1.requireAuth, (req, res) => product_controller_1.productController.update(req, res));
router.delete('/:id', auth_middleware_1.requireAuth, (req, res) => product_controller_1.productController.delete(req, res));
//# sourceMappingURL=product.routes.js.map
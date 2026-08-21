"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.blogRoutes = router;
router.get('/', (req, res) => blog_controller_1.blogController.list(req, res));
router.get('/:slug', (req, res) => blog_controller_1.blogController.getOne(req, res));
router.post('/', auth_middleware_1.requireAuth, (req, res) => blog_controller_1.blogController.create(req, res));
router.put('/:id', auth_middleware_1.requireAuth, (req, res) => blog_controller_1.blogController.update(req, res));
router.delete('/:id', auth_middleware_1.requireAuth, (req, res) => blog_controller_1.blogController.delete(req, res));
//# sourceMappingURL=blog.routes.js.map
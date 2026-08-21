"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionRoutes = void 0;
const express_1 = require("express");
const collection_controller_1 = require("./collection.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.collectionRoutes = router;
router.get('/', (req, res) => collection_controller_1.collectionController.list(req, res));
router.get('/:slug', (req, res) => collection_controller_1.collectionController.getOne(req, res));
router.post('/', auth_middleware_1.requireAuth, (req, res) => collection_controller_1.collectionController.create(req, res));
router.put('/:id', auth_middleware_1.requireAuth, (req, res) => collection_controller_1.collectionController.update(req, res));
router.delete('/:id', auth_middleware_1.requireAuth, (req, res) => collection_controller_1.collectionController.delete(req, res));
//# sourceMappingURL=collection.routes.js.map
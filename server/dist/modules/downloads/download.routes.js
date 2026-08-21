"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadRoutes = void 0;
const express_1 = require("express");
const download_controller_1 = require("./download.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.downloadRoutes = router;
router.get('/', (req, res) => download_controller_1.downloadController.list(req, res));
router.get('/:id', (req, res) => download_controller_1.downloadController.getOne(req, res));
router.post('/', auth_middleware_1.requireAuth, (req, res) => download_controller_1.downloadController.create(req, res));
router.put('/:id', auth_middleware_1.requireAuth, (req, res) => download_controller_1.downloadController.update(req, res));
router.delete('/:id', auth_middleware_1.requireAuth, (req, res) => download_controller_1.downloadController.delete(req, res));
//# sourceMappingURL=download.routes.js.map
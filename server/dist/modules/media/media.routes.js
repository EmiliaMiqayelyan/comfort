"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRoutes = void 0;
const express_1 = require("express");
const media_controller_1 = require("./media.controller");
const auth_middleware_1 = require("../../app/middleware/auth.middleware");
const upload_middleware_1 = require("../../app/middleware/upload.middleware");
const router = (0, express_1.Router)();
exports.mediaRoutes = router;
router.get('/', auth_middleware_1.requireAuth, (req, res) => media_controller_1.mediaController.list(req, res));
router.post('/', auth_middleware_1.requireAuth, upload_middleware_1.upload.single('file'), (req, res) => media_controller_1.mediaController.upload(req, res));
//# sourceMappingURL=media.routes.js.map
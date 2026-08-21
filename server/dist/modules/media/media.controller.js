"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaController = exports.MediaController = void 0;
const media_service_1 = require("./media.service");
const AppError_1 = require("../../shared/errors/AppError");
class MediaController {
    async list(_req, res) {
        res.json(await media_service_1.mediaService.list());
    }
    async upload(req, res) {
        if (!req.file)
            throw new AppError_1.AppError('No file uploaded', 400);
        const asset = await media_service_1.mediaService.createFromUpload(req.file);
        res.status(201).json(asset);
    }
}
exports.MediaController = MediaController;
exports.mediaController = new MediaController();
//# sourceMappingURL=media.controller.js.map
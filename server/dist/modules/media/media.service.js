"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaService = exports.MediaService = void 0;
const models_1 = require("../../shared/database/models");
const uuid_1 = require("../../shared/utils/uuid");
const mediaType_1 = require("../../shared/utils/mediaType");
class MediaService {
    async list() {
        return models_1.MediaAsset.findAll({ order: [['createdAt', 'DESC']] });
    }
    async createFromUpload(file) {
        const id = (0, uuid_1.generateId)();
        const type = (0, mediaType_1.detectMediaType)(file.mimetype, file.originalname);
        const url = `/uploads/${file.filename}`;
        return models_1.MediaAsset.create({
            id,
            name: file.originalname,
            type,
            url,
            folder: null,
            size: file.size,
        });
    }
}
exports.MediaService = MediaService;
exports.mediaService = new MediaService();
//# sourceMappingURL=media.service.js.map
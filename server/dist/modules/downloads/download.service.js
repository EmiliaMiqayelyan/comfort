"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadService = exports.DownloadService = void 0;
const models_1 = require("../../shared/database/models");
const AppError_1 = require("../../shared/errors/AppError");
const uuid_1 = require("../../shared/utils/uuid");
const localized_1 = require("../../shared/utils/localized");
class DownloadService {
    async list(publicOnly) {
        const where = {};
        if (publicOnly)
            where.downloadable = 1;
        return models_1.DownloadFile.findAll({ where, order: [['createdAt', 'DESC']] });
    }
    async getById(id) {
        const item = await models_1.DownloadFile.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Download not found');
        return item;
    }
    async create(data) {
        const id = (0, uuid_1.generateId)();
        if (data.title)
            data.title = (0, localized_1.fillLocalized)(data.title);
        return models_1.DownloadFile.create({ id, ...data });
    }
    async update(id, data) {
        const item = await models_1.DownloadFile.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Download not found');
        if (data.title)
            data.title = (0, localized_1.fillLocalized)(data.title);
        await item.update(data);
        return item;
    }
    async delete(id) {
        const item = await models_1.DownloadFile.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Download not found');
        await item.destroy();
    }
}
exports.DownloadService = DownloadService;
exports.downloadService = new DownloadService();
//# sourceMappingURL=download.service.js.map
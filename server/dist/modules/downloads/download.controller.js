"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadController = exports.DownloadController = void 0;
const download_dto_1 = require("./download.dto");
const download_service_1 = require("./download.service");
const param_1 = require("../../shared/utils/param");
class DownloadController {
    async list(req, res) {
        const publicOnly = req.query.public === 'true';
        res.json(await download_service_1.downloadService.list(publicOnly));
    }
    async getOne(req, res) {
        res.json(await download_service_1.downloadService.getById((0, param_1.param)(req.params.id)));
    }
    async create(req, res) {
        const data = download_dto_1.createDownloadDto.parse(req.body);
        res.status(201).json(await download_service_1.downloadService.create(data));
    }
    async update(req, res) {
        const data = download_dto_1.updateDownloadDto.parse(req.body);
        res.json(await download_service_1.downloadService.update((0, param_1.param)(req.params.id), data));
    }
    async delete(req, res) {
        await download_service_1.downloadService.delete((0, param_1.param)(req.params.id));
        res.json({ message: 'Deleted' });
    }
}
exports.DownloadController = DownloadController;
exports.downloadController = new DownloadController();
//# sourceMappingURL=download.controller.js.map
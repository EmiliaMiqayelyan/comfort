"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificateController = exports.CertificateController = void 0;
const certificate_dto_1 = require("./certificate.dto");
const certificate_service_1 = require("./certificate.service");
const param_1 = require("../../shared/utils/param");
class CertificateController {
    async list(_req, res) {
        res.json(await certificate_service_1.certificateService.list());
    }
    async getOne(req, res) {
        res.json(await certificate_service_1.certificateService.getById((0, param_1.param)(req.params.id)));
    }
    async create(req, res) {
        const data = certificate_dto_1.createCertificateDto.parse(req.body);
        res.status(201).json(await certificate_service_1.certificateService.create(data));
    }
    async update(req, res) {
        const data = certificate_dto_1.updateCertificateDto.parse(req.body);
        res.json(await certificate_service_1.certificateService.update((0, param_1.param)(req.params.id), data));
    }
    async delete(req, res) {
        await certificate_service_1.certificateService.delete((0, param_1.param)(req.params.id));
        res.json({ message: 'Deleted' });
    }
}
exports.CertificateController = CertificateController;
exports.certificateController = new CertificateController();
//# sourceMappingURL=certificate.controller.js.map
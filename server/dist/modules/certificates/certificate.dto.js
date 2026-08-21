"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCertificateDto = exports.createCertificateDto = void 0;
const zod_1 = require("zod");
const localized_1 = require("../../shared/utils/localized");
exports.createCertificateDto = zod_1.z.object({
    title: localized_1.localizedSchema,
    issuer: zod_1.z.string().nullable().optional(),
    year: zod_1.z.coerce.number().nullable().optional(),
    fileUrl: zod_1.z.string().nullable().optional(),
    image: zod_1.z.string().nullable().optional(),
});
exports.updateCertificateDto = exports.createCertificateDto.partial();
//# sourceMappingURL=certificate.dto.js.map
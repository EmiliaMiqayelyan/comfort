"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDownloadDto = exports.createDownloadDto = void 0;
const zod_1 = require("zod");
const localized_1 = require("../../shared/utils/localized");
exports.createDownloadDto = zod_1.z.object({
    filename: zod_1.z.string().min(1),
    title: localized_1.localizedSchema,
    category: zod_1.z.string().nullable().optional(),
    url: zod_1.z.string().min(1),
    fileSize: zod_1.z.string().nullable().optional(),
    downloadable: zod_1.z.union([zod_1.z.boolean(), zod_1.z.coerce.number()]).default(true),
});
exports.updateDownloadDto = exports.createDownloadDto.partial();
//# sourceMappingURL=download.dto.js.map
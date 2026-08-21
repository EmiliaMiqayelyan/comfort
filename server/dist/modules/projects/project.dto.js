"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectDto = exports.createProjectDto = void 0;
const zod_1 = require("zod");
const localized_1 = require("../../shared/utils/localized");
exports.createProjectDto = zod_1.z.object({
    slug: zod_1.z.string().min(1),
    title: localized_1.localizedSchema,
    description: localized_1.localizedSchema.optional(),
    location: localized_1.localizedSchema.optional(),
    year: zod_1.z.coerce.number().nullable().optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    beforeImage: zod_1.z.string().nullable().optional(),
    afterImage: zod_1.z.string().nullable().optional(),
    videoUrl: zod_1.z.string().nullable().optional(),
    productIds: zod_1.z.array(zod_1.z.string()).optional(),
    category: zod_1.z.string().nullable().optional(),
});
exports.updateProjectDto = exports.createProjectDto.partial();
//# sourceMappingURL=project.dto.js.map
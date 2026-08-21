"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCollectionDto = exports.createCollectionDto = void 0;
const zod_1 = require("zod");
const localized_1 = require("../../shared/utils/localized");
exports.createCollectionDto = zod_1.z.object({
    slug: zod_1.z.string().min(1),
    name: localized_1.localizedSchema,
    description: localized_1.localizedSchema.optional(),
    image: zod_1.z.string().nullable().optional(),
    style: zod_1.z.string().nullable().optional(),
});
exports.updateCollectionDto = exports.createCollectionDto.partial();
//# sourceMappingURL=collection.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductDto = exports.createProductDto = void 0;
const zod_1 = require("zod");
const localized_1 = require("../../shared/utils/localized");
exports.createProductDto = zod_1.z.object({
    slug: zod_1.z.string().min(1),
    sku: zod_1.z.string().min(1),
    name: localized_1.localizedSchema,
    description: localized_1.localizedSchema.optional(),
    categoryId: zod_1.z.string().min(1),
    collectionId: zod_1.z.string().nullable().optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    modelUrl: zod_1.z.string().nullable().optional(),
    videoUrl: zod_1.z.string().nullable().optional(),
    height: zod_1.z.coerce.number().default(0),
    width: zod_1.z.coerce.number().default(0),
    depth: zod_1.z.coerce.number().default(0),
    length: zod_1.z.coerce.number().default(0),
    material: zod_1.z.string().nullable().optional(),
    finish: zod_1.z.string().nullable().optional(),
    colors: zod_1.z.array(zod_1.z.unknown()).optional(),
    textures: zod_1.z.array(zod_1.z.unknown()).optional(),
    specs: zod_1.z.array(zod_1.z.unknown()).optional(),
    downloads: zod_1.z.array(zod_1.z.unknown()).optional(),
    price: zod_1.z.coerce.number().default(0),
    featured: zod_1.z.union([zod_1.z.boolean(), zod_1.z.coerce.number()]).optional(),
    availability: zod_1.z.enum(['in_stock', 'limited', 'preorder']).default('in_stock'),
});
exports.updateProductDto = exports.createProductDto.partial();
//# sourceMappingURL=product.dto.js.map
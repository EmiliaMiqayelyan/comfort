"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogDto = exports.createBlogDto = void 0;
const zod_1 = require("zod");
const localized_1 = require("../../shared/utils/localized");
exports.createBlogDto = zod_1.z.object({
    slug: zod_1.z.string().min(1),
    title: localized_1.localizedSchema,
    excerpt: localized_1.localizedSchema.optional(),
    content: localized_1.localizedSchema.optional(),
    coverImage: zod_1.z.string().nullable().optional(),
    category: zod_1.z.string().nullable().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    author: zod_1.z.record(zod_1.z.unknown()).nullable().optional(),
    publishedAt: zod_1.z.string().nullable().optional(),
});
exports.updateBlogDto = exports.createBlogDto.partial();
//# sourceMappingURL=blog.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = exports.BlogService = void 0;
const models_1 = require("../../shared/database/models");
const AppError_1 = require("../../shared/errors/AppError");
const uuid_1 = require("../../shared/utils/uuid");
const localized_1 = require("../../shared/utils/localized");
class BlogService {
    async list() {
        return models_1.BlogPost.findAll({ order: [['publishedAt', 'DESC']] });
    }
    async getBySlugOrId(slugOrId) {
        const item = (await models_1.BlogPost.findOne({ where: { slug: slugOrId } })) ??
            (await models_1.BlogPost.findByPk(slugOrId));
        if (!item)
            throw AppError_1.AppError.notFound('Blog post not found');
        return item;
    }
    async create(data) {
        const id = (0, uuid_1.generateId)();
        if (data.title)
            data.title = (0, localized_1.fillLocalized)(data.title);
        if (data.excerpt)
            data.excerpt = (0, localized_1.fillLocalized)(data.excerpt);
        if (data.content)
            data.content = (0, localized_1.fillLocalized)(data.content);
        return models_1.BlogPost.create({ id, ...data });
    }
    async update(id, data) {
        const item = await models_1.BlogPost.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Blog post not found');
        if (data.title)
            data.title = (0, localized_1.fillLocalized)(data.title);
        if (data.excerpt)
            data.excerpt = (0, localized_1.fillLocalized)(data.excerpt);
        if (data.content)
            data.content = (0, localized_1.fillLocalized)(data.content);
        await item.update(data);
        return item;
    }
    async delete(id) {
        const item = await models_1.BlogPost.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Blog post not found');
        await item.destroy();
    }
}
exports.BlogService = BlogService;
exports.blogService = new BlogService();
//# sourceMappingURL=blog.service.js.map
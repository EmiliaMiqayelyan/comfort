"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = exports.CategoryService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../shared/database/models");
const AppError_1 = require("../../shared/errors/AppError");
const uuid_1 = require("../../shared/utils/uuid");
const localized_1 = require("../../shared/utils/localized");
class CategoryService {
    async list() {
        const categories = await models_1.Category.findAll({
            attributes: {
                include: [
                    [
                        (0, sequelize_1.literal)(`(
              SELECT COUNT(*) FROM products
              WHERE products.category_id = Category.id
              OR products.category_id IN (SELECT c2.id FROM categories c2 WHERE c2.parent_id = Category.id)
            )`),
                        'product_count',
                    ],
                ],
            },
            order: [['createdAt', 'ASC']],
        });
        return categories;
    }
    async getBySlugOrId(slugOrId) {
        const item = (await models_1.Category.findOne({ where: { slug: slugOrId } })) ??
            (await models_1.Category.findByPk(slugOrId));
        if (!item)
            throw AppError_1.AppError.notFound('Category not found');
        return item;
    }
    async create(data) {
        const id = (0, uuid_1.generateId)();
        if (data.name)
            data.name = (0, localized_1.fillLocalized)(data.name);
        if (data.description)
            data.description = (0, localized_1.fillLocalized)(data.description);
        return models_1.Category.create({ id, ...data });
    }
    async update(id, data) {
        const item = await models_1.Category.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Category not found');
        if (data.name)
            data.name = (0, localized_1.fillLocalized)(data.name);
        if (data.description)
            data.description = (0, localized_1.fillLocalized)(data.description);
        await item.update(data);
        return item;
    }
    async delete(id) {
        const item = await models_1.Category.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Category not found');
        await item.destroy();
    }
}
exports.CategoryService = CategoryService;
exports.categoryService = new CategoryService();
//# sourceMappingURL=category.service.js.map
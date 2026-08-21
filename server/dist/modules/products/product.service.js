"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = exports.ProductService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../shared/database/models");
const AppError_1 = require("../../shared/errors/AppError");
const uuid_1 = require("../../shared/utils/uuid");
const localized_1 = require("../../shared/utils/localized");
class ProductService {
    async list(query) {
        const where = {};
        if (query.featured === 'true')
            where.featured = 1;
        if (query.category) {
            const cat = await models_1.Category.findOne({ where: { slug: query.category } });
            if (cat) {
                const children = await models_1.Category.findAll({ where: { parentId: cat.id }, attributes: ['id'] });
                const ids = [cat.id, ...children.map(c => c.id)];
                where.categoryId = { [sequelize_1.Op.in]: ids };
            }
        }
        if (query.collection) {
            const col = await models_1.Collection.findOne({ where: { slug: query.collection } });
            if (col)
                where.collectionId = col.id;
        }
        if (query.q) {
            const term = `%${query.q}%`;
            where[sequelize_1.Op.or] = [
                { sku: { [sequelize_1.Op.like]: term } },
                { slug: { [sequelize_1.Op.like]: term } },
                (0, sequelize_1.literal)(`JSON_UNQUOTE(JSON_EXTRACT(name, '$.en')) LIKE ${models_1.Product.sequelize.escape(term)}`),
            ];
        }
        return models_1.Product.findAll({ where, order: [['createdAt', 'DESC']] });
    }
    async getBySlugOrId(slugOrId) {
        const product = (await models_1.Product.findOne({ where: { slug: slugOrId } })) ??
            (await models_1.Product.findByPk(slugOrId));
        if (!product)
            throw AppError_1.AppError.notFound('Product not found');
        return product;
    }
    async create(data) {
        const id = (0, uuid_1.generateId)();
        if (data.name)
            data.name = (0, localized_1.fillLocalized)(data.name);
        if (data.description)
            data.description = (0, localized_1.fillLocalized)(data.description);
        const collectionId = data.collectionId;
        if (collectionId === '' || collectionId === '__none__')
            data.collectionId = null;
        return models_1.Product.create({ id, ...data });
    }
    async update(id, data) {
        const product = await models_1.Product.findByPk(id);
        if (!product)
            throw AppError_1.AppError.notFound('Product not found');
        if (data.name)
            data.name = (0, localized_1.fillLocalized)(data.name);
        if (data.description)
            data.description = (0, localized_1.fillLocalized)(data.description);
        const collectionId = data.collectionId;
        if (collectionId === '' || collectionId === '__none__')
            data.collectionId = null;
        await product.update(data);
        return product;
    }
    async delete(id) {
        const product = await models_1.Product.findByPk(id);
        if (!product)
            throw AppError_1.AppError.notFound('Product not found');
        await product.destroy();
    }
}
exports.ProductService = ProductService;
exports.productService = new ProductService();
//# sourceMappingURL=product.service.js.map
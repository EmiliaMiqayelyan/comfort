"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionService = exports.CollectionService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../shared/database/models");
const AppError_1 = require("../../shared/errors/AppError");
const uuid_1 = require("../../shared/utils/uuid");
const localized_1 = require("../../shared/utils/localized");
class CollectionService {
    async list() {
        return models_1.Collection.findAll({
            attributes: {
                include: [
                    [
                        (0, sequelize_1.literal)('(SELECT COUNT(*) FROM products WHERE products.collection_id = Collection.id)'),
                        'product_count',
                    ],
                ],
            },
            order: [['createdAt', 'ASC']],
        });
    }
    async getBySlugOrId(slugOrId) {
        const item = (await models_1.Collection.findOne({ where: { slug: slugOrId } })) ??
            (await models_1.Collection.findByPk(slugOrId));
        if (!item)
            throw AppError_1.AppError.notFound('Collection not found');
        return item;
    }
    async create(data) {
        const id = (0, uuid_1.generateId)();
        if (data.name)
            data.name = (0, localized_1.fillLocalized)(data.name);
        if (data.description)
            data.description = (0, localized_1.fillLocalized)(data.description);
        return models_1.Collection.create({ id, ...data });
    }
    async update(id, data) {
        const item = await models_1.Collection.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Collection not found');
        if (data.name)
            data.name = (0, localized_1.fillLocalized)(data.name);
        if (data.description)
            data.description = (0, localized_1.fillLocalized)(data.description);
        await item.update(data);
        return item;
    }
    async delete(id) {
        const item = await models_1.Collection.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Collection not found');
        await item.destroy();
    }
}
exports.CollectionService = CollectionService;
exports.collectionService = new CollectionService();
//# sourceMappingURL=collection.service.js.map
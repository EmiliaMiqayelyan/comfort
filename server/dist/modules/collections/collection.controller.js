"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionController = exports.CollectionController = void 0;
const collection_dto_1 = require("./collection.dto");
const collection_service_1 = require("./collection.service");
const param_1 = require("../../shared/utils/param");
class CollectionController {
    async list(_req, res) {
        res.json(await collection_service_1.collectionService.list());
    }
    async getOne(req, res) {
        res.json(await collection_service_1.collectionService.getBySlugOrId((0, param_1.param)(req.params.slug)));
    }
    async create(req, res) {
        const data = collection_dto_1.createCollectionDto.parse(req.body);
        res.status(201).json(await collection_service_1.collectionService.create(data));
    }
    async update(req, res) {
        const data = collection_dto_1.updateCollectionDto.parse(req.body);
        res.json(await collection_service_1.collectionService.update((0, param_1.param)(req.params.id), data));
    }
    async delete(req, res) {
        await collection_service_1.collectionService.delete((0, param_1.param)(req.params.id));
        res.json({ message: 'Deleted' });
    }
}
exports.CollectionController = CollectionController;
exports.collectionController = new CollectionController();
//# sourceMappingURL=collection.controller.js.map
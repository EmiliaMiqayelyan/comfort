"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = exports.CategoryController = void 0;
const category_dto_1 = require("./category.dto");
const category_service_1 = require("./category.service");
const param_1 = require("../../shared/utils/param");
class CategoryController {
    async list(_req, res) {
        res.json(await category_service_1.categoryService.list());
    }
    async getOne(req, res) {
        res.json(await category_service_1.categoryService.getBySlugOrId((0, param_1.param)(req.params.slug)));
    }
    async create(req, res) {
        const data = category_dto_1.createCategoryDto.parse(req.body);
        res.status(201).json(await category_service_1.categoryService.create(data));
    }
    async update(req, res) {
        const data = category_dto_1.updateCategoryDto.parse(req.body);
        res.json(await category_service_1.categoryService.update((0, param_1.param)(req.params.id), data));
    }
    async delete(req, res) {
        await category_service_1.categoryService.delete((0, param_1.param)(req.params.id));
        res.json({ message: 'Deleted' });
    }
}
exports.CategoryController = CategoryController;
exports.categoryController = new CategoryController();
//# sourceMappingURL=category.controller.js.map
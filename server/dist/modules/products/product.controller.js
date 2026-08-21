"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = exports.ProductController = void 0;
const product_dto_1 = require("./product.dto");
const product_service_1 = require("./product.service");
const param_1 = require("../../shared/utils/param");
class ProductController {
    async list(req, res) {
        const items = await product_service_1.productService.list(req.query);
        res.json(items);
    }
    async getOne(req, res) {
        const item = await product_service_1.productService.getBySlugOrId((0, param_1.param)(req.params.slug));
        res.json(item);
    }
    async create(req, res) {
        const data = product_dto_1.createProductDto.parse(req.body);
        const item = await product_service_1.productService.create(data);
        res.status(201).json(item);
    }
    async update(req, res) {
        const data = product_dto_1.updateProductDto.parse(req.body);
        const item = await product_service_1.productService.update((0, param_1.param)(req.params.id), data);
        res.json(item);
    }
    async delete(req, res) {
        await product_service_1.productService.delete((0, param_1.param)(req.params.id));
        res.json({ message: 'Deleted' });
    }
}
exports.ProductController = ProductController;
exports.productController = new ProductController();
//# sourceMappingURL=product.controller.js.map
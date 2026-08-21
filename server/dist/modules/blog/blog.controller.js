"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = exports.BlogController = void 0;
const blog_dto_1 = require("./blog.dto");
const blog_service_1 = require("./blog.service");
const param_1 = require("../../shared/utils/param");
class BlogController {
    async list(_req, res) {
        res.json(await blog_service_1.blogService.list());
    }
    async getOne(req, res) {
        res.json(await blog_service_1.blogService.getBySlugOrId((0, param_1.param)(req.params.slug)));
    }
    async create(req, res) {
        const data = blog_dto_1.createBlogDto.parse(req.body);
        res.status(201).json(await blog_service_1.blogService.create(data));
    }
    async update(req, res) {
        const data = blog_dto_1.updateBlogDto.parse(req.body);
        res.json(await blog_service_1.blogService.update((0, param_1.param)(req.params.id), data));
    }
    async delete(req, res) {
        await blog_service_1.blogService.delete((0, param_1.param)(req.params.id));
        res.json({ message: 'Deleted' });
    }
}
exports.BlogController = BlogController;
exports.blogController = new BlogController();
//# sourceMappingURL=blog.controller.js.map
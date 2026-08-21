"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = exports.ProjectController = void 0;
const project_dto_1 = require("./project.dto");
const project_service_1 = require("./project.service");
const param_1 = require("../../shared/utils/param");
class ProjectController {
    async list(_req, res) {
        res.json(await project_service_1.projectService.list());
    }
    async getOne(req, res) {
        res.json(await project_service_1.projectService.getBySlugOrId((0, param_1.param)(req.params.slug)));
    }
    async create(req, res) {
        const data = project_dto_1.createProjectDto.parse(req.body);
        res.status(201).json(await project_service_1.projectService.create(data));
    }
    async update(req, res) {
        const data = project_dto_1.updateProjectDto.parse(req.body);
        res.json(await project_service_1.projectService.update((0, param_1.param)(req.params.id), data));
    }
    async delete(req, res) {
        await project_service_1.projectService.delete((0, param_1.param)(req.params.id));
        res.json({ message: 'Deleted' });
    }
}
exports.ProjectController = ProjectController;
exports.projectController = new ProjectController();
//# sourceMappingURL=project.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = exports.ProjectService = void 0;
const models_1 = require("../../shared/database/models");
const AppError_1 = require("../../shared/errors/AppError");
const uuid_1 = require("../../shared/utils/uuid");
const localized_1 = require("../../shared/utils/localized");
class ProjectService {
    async list() {
        return models_1.Project.findAll({ order: [['year', 'DESC']] });
    }
    async getBySlugOrId(slugOrId) {
        const item = (await models_1.Project.findOne({ where: { slug: slugOrId } })) ??
            (await models_1.Project.findByPk(slugOrId));
        if (!item)
            throw AppError_1.AppError.notFound('Project not found');
        return item;
    }
    async create(data) {
        const id = (0, uuid_1.generateId)();
        if (data.title)
            data.title = (0, localized_1.fillLocalized)(data.title);
        if (data.description)
            data.description = (0, localized_1.fillLocalized)(data.description);
        if (data.location)
            data.location = (0, localized_1.fillLocalized)(data.location);
        return models_1.Project.create({ id, ...data });
    }
    async update(id, data) {
        const item = await models_1.Project.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Project not found');
        if (data.title)
            data.title = (0, localized_1.fillLocalized)(data.title);
        if (data.description)
            data.description = (0, localized_1.fillLocalized)(data.description);
        if (data.location)
            data.location = (0, localized_1.fillLocalized)(data.location);
        await item.update(data);
        return item;
    }
    async delete(id) {
        const item = await models_1.Project.findByPk(id);
        if (!item)
            throw AppError_1.AppError.notFound('Project not found');
        await item.destroy();
    }
}
exports.ProjectService = ProjectService;
exports.projectService = new ProjectService();
//# sourceMappingURL=project.service.js.map
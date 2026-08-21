"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = exports.ContactService = void 0;
const models_1 = require("../../shared/database/models");
const uuid_1 = require("../../shared/utils/uuid");
class ContactService {
    async list() {
        return models_1.ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    }
    async create(data) {
        const id = (0, uuid_1.generateId)();
        return models_1.ContactMessage.create({ id, ...data });
    }
}
exports.ContactService = ContactService;
exports.contactService = new ContactService();
//# sourceMappingURL=contact.service.js.map
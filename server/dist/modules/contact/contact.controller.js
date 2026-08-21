"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = exports.ContactController = void 0;
const contact_dto_1 = require("./contact.dto");
const contact_service_1 = require("./contact.service");
class ContactController {
    async list(_req, res) {
        res.json(await contact_service_1.contactService.list());
    }
    async create(req, res) {
        const data = contact_dto_1.createContactDto.parse(req.body);
        res.status(201).json(await contact_service_1.contactService.create(data));
    }
}
exports.ContactController = ContactController;
exports.contactController = new ContactController();
//# sourceMappingURL=contact.controller.js.map
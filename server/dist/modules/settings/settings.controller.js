"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsController = exports.SettingsController = void 0;
const settings_dto_1 = require("./settings.dto");
const settings_service_1 = require("./settings.service");
class SettingsController {
    async getContact(_req, res) {
        res.json(await settings_service_1.settingsService.getContact());
    }
    async updateContact(req, res) {
        const data = settings_dto_1.updateContactSettingsDto.parse(req.body);
        res.json(await settings_service_1.settingsService.updateContact(data));
    }
}
exports.SettingsController = SettingsController;
exports.settingsController = new SettingsController();
//# sourceMappingURL=settings.controller.js.map
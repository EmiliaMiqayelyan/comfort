"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsService = exports.SettingsService = void 0;
const models_1 = require("../../shared/database/models");
const DEFAULT_CONTACT = {
    phone: '',
    email: '',
    address: { en: '', ru: '', am: '' },
    workingHours: { en: '', ru: '', am: '' },
};
class SettingsService {
    async getContact() {
        const row = await models_1.SiteSetting.findByPk('contact');
        return row ? row.settingValue : DEFAULT_CONTACT;
    }
    async updateContact(value) {
        const [row, created] = await models_1.SiteSetting.findOrCreate({
            where: { settingKey: 'contact' },
            defaults: { settingKey: 'contact', settingValue: value },
        });
        if (!created) {
            row.settingValue = value;
            await row.save();
        }
        return row.settingValue;
    }
}
exports.SettingsService = SettingsService;
exports.settingsService = new SettingsService();
//# sourceMappingURL=settings.service.js.map
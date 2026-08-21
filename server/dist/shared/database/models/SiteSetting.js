"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSetting = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class SiteSetting extends sequelize_1.Model {
}
exports.SiteSetting = SiteSetting;
SiteSetting.init({
    settingKey: { type: sequelize_1.DataTypes.STRING(80), primaryKey: true },
    settingValue: { type: sequelize_1.DataTypes.JSON, allowNull: false },
}, { sequelize: sequelize_2.sequelize, tableName: 'site_settings', modelName: 'SiteSetting', timestamps: false });
//# sourceMappingURL=SiteSetting.js.map
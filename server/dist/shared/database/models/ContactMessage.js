"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessage = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class ContactMessage extends sequelize_1.Model {
}
exports.ContactMessage = ContactMessage;
ContactMessage.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(160), allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING(190), allowNull: false },
    phone: { type: sequelize_1.DataTypes.STRING(40), allowNull: true },
    company: { type: sequelize_1.DataTypes.STRING(160), allowNull: true },
    message: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
}, { sequelize: sequelize_2.sequelize, tableName: 'contact_messages', modelName: 'ContactMessage', updatedAt: false });
//# sourceMappingURL=ContactMessage.js.map
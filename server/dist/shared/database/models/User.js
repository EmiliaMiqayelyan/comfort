"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(120), allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING(190), allowNull: false, unique: true },
    passwordHash: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'manager', 'editor', 'translator', 'dealer'),
        defaultValue: 'editor',
    },
    avatar: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
}, { sequelize: sequelize_2.sequelize, tableName: 'users', modelName: 'User' });
//# sourceMappingURL=User.js.map
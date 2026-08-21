"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    slug: { type: sequelize_1.DataTypes.STRING(160), allowNull: false, unique: true },
    name: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    description: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    image: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    parentId: { type: sequelize_1.DataTypes.CHAR(36), allowNull: true },
}, { sequelize: sequelize_2.sequelize, tableName: 'categories', modelName: 'Category' });
//# sourceMappingURL=Category.js.map
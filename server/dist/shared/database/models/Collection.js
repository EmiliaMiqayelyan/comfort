"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Collection extends sequelize_1.Model {
}
exports.Collection = Collection;
Collection.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    slug: { type: sequelize_1.DataTypes.STRING(160), allowNull: false, unique: true },
    name: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    description: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    image: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    style: { type: sequelize_1.DataTypes.STRING(80), allowNull: true },
}, { sequelize: sequelize_2.sequelize, tableName: 'collections', modelName: 'Collection' });
//# sourceMappingURL=Collection.js.map
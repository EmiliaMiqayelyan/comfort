"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Certificate extends sequelize_1.Model {
}
exports.Certificate = Certificate;
Certificate.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    title: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    issuer: { type: sequelize_1.DataTypes.STRING(160), allowNull: true },
    year: { type: sequelize_1.DataTypes.SMALLINT, allowNull: true },
    fileUrl: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    image: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
}, { sequelize: sequelize_2.sequelize, tableName: 'certificates', modelName: 'Certificate' });
//# sourceMappingURL=Certificate.js.map
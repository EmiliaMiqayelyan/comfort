"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Project extends sequelize_1.Model {
}
exports.Project = Project;
Project.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    slug: { type: sequelize_1.DataTypes.STRING(160), allowNull: false, unique: true },
    title: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    description: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    location: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    year: { type: sequelize_1.DataTypes.SMALLINT, allowNull: true },
    images: { type: sequelize_1.DataTypes.JSON, defaultValue: [] },
    beforeImage: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    afterImage: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    videoUrl: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    productIds: { type: sequelize_1.DataTypes.JSON, defaultValue: [] },
    category: { type: sequelize_1.DataTypes.STRING(80), allowNull: true },
}, { sequelize: sequelize_2.sequelize, tableName: 'projects', modelName: 'Project' });
//# sourceMappingURL=Project.js.map
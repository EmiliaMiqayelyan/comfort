"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorProject = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class CalculatorProject extends sequelize_1.Model {
}
exports.CalculatorProject = CalculatorProject;
CalculatorProject.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    userEmail: { type: sequelize_1.DataTypes.STRING(190), allowNull: true },
    inputJson: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    resultJson: { type: sequelize_1.DataTypes.JSON, allowNull: false },
}, { sequelize: sequelize_2.sequelize, tableName: 'calculator_projects', modelName: 'CalculatorProject', updatedAt: false });
//# sourceMappingURL=CalculatorProject.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadFile = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class DownloadFile extends sequelize_1.Model {
}
exports.DownloadFile = DownloadFile;
DownloadFile.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    filename: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    title: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    category: { type: sequelize_1.DataTypes.STRING(80), allowNull: true },
    url: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
    fileSize: { type: sequelize_1.DataTypes.STRING(40), allowNull: true },
    downloadable: { type: sequelize_1.DataTypes.TINYINT, defaultValue: 1 },
}, { sequelize: sequelize_2.sequelize, tableName: 'download_files', modelName: 'DownloadFile' });
//# sourceMappingURL=DownloadFile.js.map
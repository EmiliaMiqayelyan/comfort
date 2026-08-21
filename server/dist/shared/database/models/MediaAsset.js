"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAsset = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class MediaAsset extends sequelize_1.Model {
}
exports.MediaAsset = MediaAsset;
MediaAsset.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    type: {
        type: sequelize_1.DataTypes.ENUM('image', 'video', 'pdf', 'glb', 'usdz', 'texture'),
        allowNull: false,
    },
    url: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
    folder: { type: sequelize_1.DataTypes.STRING(120), allowNull: true },
    size: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
}, { sequelize: sequelize_2.sequelize, tableName: 'media_assets', modelName: 'MediaAsset', updatedAt: false });
//# sourceMappingURL=MediaAsset.js.map
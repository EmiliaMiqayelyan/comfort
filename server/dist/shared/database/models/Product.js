"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    slug: { type: sequelize_1.DataTypes.STRING(160), allowNull: false, unique: true },
    sku: { type: sequelize_1.DataTypes.STRING(80), allowNull: false, unique: true },
    name: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    description: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    categoryId: { type: sequelize_1.DataTypes.CHAR(36), allowNull: false },
    collectionId: { type: sequelize_1.DataTypes.CHAR(36), allowNull: true },
    images: { type: sequelize_1.DataTypes.JSON, defaultValue: [] },
    modelUrl: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    videoUrl: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    height: { type: sequelize_1.DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    width: { type: sequelize_1.DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    depth: { type: sequelize_1.DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    length: { type: sequelize_1.DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    material: { type: sequelize_1.DataTypes.STRING(160), allowNull: true },
    finish: { type: sequelize_1.DataTypes.STRING(160), allowNull: true },
    colors: { type: sequelize_1.DataTypes.JSON, defaultValue: [] },
    textures: { type: sequelize_1.DataTypes.JSON, defaultValue: [] },
    specs: { type: sequelize_1.DataTypes.JSON, defaultValue: [] },
    downloads: { type: sequelize_1.DataTypes.JSON, defaultValue: [] },
    price: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    featured: { type: sequelize_1.DataTypes.TINYINT, defaultValue: 0 },
    availability: {
        type: sequelize_1.DataTypes.ENUM('in_stock', 'limited', 'preorder'),
        defaultValue: 'in_stock',
    },
}, { sequelize: sequelize_2.sequelize, tableName: 'products', modelName: 'Product' });
//# sourceMappingURL=Product.js.map
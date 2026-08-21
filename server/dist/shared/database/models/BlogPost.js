"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class BlogPost extends sequelize_1.Model {
}
exports.BlogPost = BlogPost;
BlogPost.init({
    id: { type: sequelize_1.DataTypes.CHAR(36), primaryKey: true },
    slug: { type: sequelize_1.DataTypes.STRING(160), allowNull: false, unique: true },
    title: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    excerpt: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    content: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    coverImage: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    category: { type: sequelize_1.DataTypes.STRING(80), allowNull: true },
    tags: { type: sequelize_1.DataTypes.JSON, defaultValue: [] },
    author: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    publishedAt: { type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
}, { sequelize: sequelize_2.sequelize, tableName: 'blog_posts', modelName: 'BlogPost' });
//# sourceMappingURL=BlogPost.js.map
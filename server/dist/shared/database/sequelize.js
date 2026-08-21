"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../app/config/config");
exports.sequelize = new sequelize_1.Sequelize(config_1.config.MYSQL_DATABASE, config_1.config.MYSQL_USER, config_1.config.MYSQL_PASSWORD, {
    host: config_1.config.MYSQL_HOST,
    port: config_1.config.MYSQL_PORT,
    dialect: 'mysql',
    logging: config_1.config.NODE_ENV === 'development' ? console.log : false,
    define: {
        underscored: true,
        timestamps: true,
    },
});
//# sourceMappingURL=sequelize.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./shared/types/express.d.ts" />
const config_1 = require("./app/config/config");
const app_1 = require("./app/app");
const sequelize_1 = require("./shared/database/sequelize");
require("./shared/database/models");
async function bootstrap() {
    await sequelize_1.sequelize.authenticate();
    console.log('Database connected');
    const app = (0, app_1.createApp)();
    app.listen(config_1.config.PORT, () => {
        console.log(`Server running on port ${config_1.config.PORT} [${config_1.config.NODE_ENV}]`);
    });
}
bootstrap().catch((err) => {
    console.error('Failed to start:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map
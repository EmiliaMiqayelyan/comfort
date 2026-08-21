"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config/config");
const index_1 = require("./routes/index");
const error_middleware_1 = require("./middleware/error.middleware");
function createApp() {
    const app = (0, express_1.default)();
    const origins = config_1.config.CLIENT_ORIGIN.split(',').map(o => o.trim());
    app.use((0, cors_1.default)({ origin: origins, credentials: true }));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '..', '..', 'uploads')));
    app.use('/api', index_1.apiRouter);
    app.use(error_middleware_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map
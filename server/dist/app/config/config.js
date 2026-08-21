"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(4000),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    CLIENT_ORIGIN: zod_1.z.string().default('http://localhost:3000'),
    MYSQL_HOST: zod_1.z.string().default('127.0.0.1'),
    MYSQL_PORT: zod_1.z.coerce.number().default(3306),
    MYSQL_USER: zod_1.z.string().default('root'),
    MYSQL_PASSWORD: zod_1.z.string().default(''),
    MYSQL_DATABASE: zod_1.z.string().default('comfort'),
    JWT_SECRET: zod_1.z.string().min(1),
    JWT_EXPIRES_IN: zod_1.z.string().default('7d'),
});
exports.config = envSchema.parse(process.env);
//# sourceMappingURL=config.js.map
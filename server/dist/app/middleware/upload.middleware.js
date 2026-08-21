"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("../../shared/utils/uuid");
const storage = multer_1.default.diskStorage({
    destination: path_1.default.resolve(__dirname, '..', '..', '..', 'uploads'),
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${(0, uuid_1.generateId)()}${ext}`);
    },
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 },
});
//# sourceMappingURL=upload.middleware.js.map
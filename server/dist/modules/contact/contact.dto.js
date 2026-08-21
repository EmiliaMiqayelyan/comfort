"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactDto = void 0;
const zod_1 = require("zod");
exports.createContactDto = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().nullable().optional(),
    company: zod_1.z.string().nullable().optional(),
    message: zod_1.z.string().min(1),
});
//# sourceMappingURL=contact.dto.js.map
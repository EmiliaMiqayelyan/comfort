"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCalculatorDto = void 0;
const zod_1 = require("zod");
exports.createCalculatorDto = zod_1.z.object({
    userEmail: zod_1.z.string().email().nullable().optional(),
    inputJson: zod_1.z.record(zod_1.z.unknown()),
    resultJson: zod_1.z.record(zod_1.z.unknown()),
});
//# sourceMappingURL=calculator.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.param = param;
function param(value) {
    if (Array.isArray(value))
        return value[0] ?? '';
    return value ?? '';
}
//# sourceMappingURL=param.js.map
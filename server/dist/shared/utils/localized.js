"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizedSchema = void 0;
exports.fillLocalized = fillLocalized;
const zod_1 = require("zod");
exports.localizedSchema = zod_1.z.object({
    en: zod_1.z.string().default(''),
    ru: zod_1.z.string().default(''),
    am: zod_1.z.string().default(''),
});
function fillLocalized(data) {
    const en = data.en ?? '';
    return {
        en,
        ru: data.ru || en,
        am: data.am || en,
    };
}
//# sourceMappingURL=localized.js.map
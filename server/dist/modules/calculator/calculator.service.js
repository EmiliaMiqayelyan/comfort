"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatorService = exports.CalculatorService = void 0;
const models_1 = require("../../shared/database/models");
const uuid_1 = require("../../shared/utils/uuid");
class CalculatorService {
    async create(data) {
        const id = (0, uuid_1.generateId)();
        return models_1.CalculatorProject.create({ id, ...data });
    }
}
exports.CalculatorService = CalculatorService;
exports.calculatorService = new CalculatorService();
//# sourceMappingURL=calculator.service.js.map
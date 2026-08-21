"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatorController = exports.CalculatorController = void 0;
const calculator_dto_1 = require("./calculator.dto");
const calculator_service_1 = require("./calculator.service");
class CalculatorController {
    async create(req, res) {
        const data = calculator_dto_1.createCalculatorDto.parse(req.body);
        res.status(201).json(await calculator_service_1.calculatorService.create(data));
    }
}
exports.CalculatorController = CalculatorController;
exports.calculatorController = new CalculatorController();
//# sourceMappingURL=calculator.controller.js.map
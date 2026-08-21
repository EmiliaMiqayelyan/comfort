"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatorRoutes = void 0;
const express_1 = require("express");
const calculator_controller_1 = require("./calculator.controller");
const router = (0, express_1.Router)();
exports.calculatorRoutes = router;
router.post('/', (req, res) => calculator_controller_1.calculatorController.create(req, res));
//# sourceMappingURL=calculator.routes.js.map
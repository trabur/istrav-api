"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicleReducer_1 = __importDefault(require("../vehicles/vehicleReducer"));
const StoreService_1 = require("./StoreService");
const reducers = [
    vehicleReducer_1.default
];
let ss = new StoreService_1.StoreService(reducers);
exports.default = ss;
//# sourceMappingURL=index.js.map
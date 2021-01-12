"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVehicleQuery = void 0;
const store_1 = __importDefault(require("../store"));
class GetVehicleQuery {
    constructor(id) {
        this.id = null;
        this.id = id;
    }
    run() {
        return store_1.default.getVehicleView(this.id);
    }
}
exports.GetVehicleQuery = GetVehicleQuery;
//# sourceMappingURL=GetVehicleQuery.js.map
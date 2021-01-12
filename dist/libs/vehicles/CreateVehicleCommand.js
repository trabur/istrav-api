"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVehicleCommand = void 0;
const store_1 = __importDefault(require("../store"));
const uuid_1 = require("uuid");
const events_1 = require("./events");
class CreateVehicleCommand {
    constructor(vehicle) {
        this.vehicle = null;
        this.vehicle = vehicle;
    }
    run() {
        const id = uuid_1.v4();
        const event = events_1.CreateVehicle(id, this.vehicle);
        const events = [event];
        return store_1.default.store(events);
    }
}
exports.CreateVehicleCommand = CreateVehicleCommand;
//# sourceMappingURL=CreateVehicleCommand.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVehicle = exports.eventTypes = void 0;
const eventTypes = {
    createVehicle: "CreateVehicle"
};
exports.eventTypes = eventTypes;
function CreateVehicle(id, vehicle) {
    return {
        type: eventTypes.createVehicle,
        id,
        name: vehicle.name,
        lat: vehicle.lat,
        long: vehicle.long
    };
}
exports.CreateVehicle = CreateVehicle;
//# sourceMappingURL=events.js.map
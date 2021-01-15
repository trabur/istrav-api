"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
function default_1(socket) {
    return (data) => {
        console.log("Event vehicles getVehicle:");
        console.log("--------------------------");
        console.log(data);
        request_1.default(`http://localhost:3000/api/v1/vehicles/${data.id}`, { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            // res callback to this place
            let roomId = `vehicles:${data.respondBackTo}`; // 'vehicles:my-secret-room'
            // phoenix channel
            let channel = socket.channel(roomId, {});
            channel.join()
                .receive("ok", ({ messages }) => console.log(`joined ${roomId} channel`, messages))
                .receive("error", ({ reason }) => console.log(`failed to join ${roomId} channel`, reason))
                .receive("timeout", () => console.log("still waiting..."));
            // respond
            channel.push(`vehicles:`, body);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=getVehicle.js.map
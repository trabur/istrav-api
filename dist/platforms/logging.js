"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.stop = void 0;
// listener references
let ref1;
let ref2;
// listener functions
const onSave_1 = __importDefault(require("./logging/onSave"));
// import onTick from './users/onTick'
/******
 * trigger methods
 ******/
function run(prisma, channel) {
    // start listening
    ref1 = channel.on("vault:platforms:logging:save", onSave_1.default(prisma, channel));
    // ref2 = channel.on("vault:platforms:counter:tick", onTick(prisma, channel))
}
exports.run = run;
function stop(channel) {
    // quit listening
    channel.off("vault:platforms:logging:save", ref1);
    // channel.off("vault:platforms:counter:tick", ref2)
}
exports.stop = stop;
//# sourceMappingURL=logging.js.map
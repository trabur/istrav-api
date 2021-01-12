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
const onBind_1 = __importDefault(require("./publishSubscribe/onBind"));
const onTrigger_1 = __importDefault(require("./publishSubscribe/onTrigger"));
/******
 * trigger methods
 ******/
function run(prisma, channel) {
    // start listening
    ref1 = channel.on("vault:platforms:publishSubscribe:bind", onBind_1.default(prisma, channel));
    ref2 = channel.on("vault:platforms:publishSubscribe:trigger", onTrigger_1.default(prisma, channel));
}
exports.run = run;
function stop(channel) {
    // quit listening
    channel.off("vault:platforms:publishSubscribe:bind", ref1);
    channel.off("vault:platforms:publishSubscribe:trigger", ref2);
}
exports.stop = stop;
//# sourceMappingURL=publishSubscribe.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.stop = void 0;
// listener references
let ref1;
let ref2;
let ref3;
let ref4;
// listener functions
const onRegister_1 = __importDefault(require("./users/onRegister"));
const onLogin_1 = __importDefault(require("./users/onLogin"));
const onUsers_1 = __importDefault(require("./users/onUsers"));
const onRemove_1 = __importDefault(require("./users/onRemove"));
/******
 * trigger methods
 ******/
function run(prisma, channel) {
    // start listening
    ref1 = channel.on("vault:users:register", onRegister_1.default(prisma, channel));
    ref2 = channel.on("vault:users:login", onLogin_1.default(prisma, channel));
    ref3 = channel.on("vault:users:users", onUsers_1.default(prisma, channel));
    ref4 = channel.on("vault:users:remove", onRemove_1.default(prisma, channel));
}
exports.run = run;
function stop(channel) {
    // quit listening
    channel.off("vault:users:register", ref1);
    channel.off("vault:users:login", ref2);
    channel.off("vault:users:users", ref3);
    channel.off("vault:users:remove", ref4);
}
exports.stop = stop;
//# sourceMappingURL=users.js.map
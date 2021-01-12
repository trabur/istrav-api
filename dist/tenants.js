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
const onRegister_1 = __importDefault(require("./tenants/onRegister"));
const onLogin_1 = __importDefault(require("./tenants/onLogin"));
const onTenants_1 = __importDefault(require("./tenants/onTenants"));
const onRemove_1 = __importDefault(require("./tenants/onRemove"));
/******
 * trigger methods
 ******/
function run(prisma, channel) {
    // start listening
    ref1 = channel.on("vault:tenants:register", onRegister_1.default(prisma, channel));
    ref2 = channel.on("vault:tenants:login", onLogin_1.default(prisma, channel));
    ref3 = channel.on("vault:tenants:tenants", onTenants_1.default(prisma, channel));
    ref4 = channel.on("vault:tenants:remove", onRemove_1.default(prisma, channel));
}
exports.run = run;
function stop(channel) {
    // quit listening
    channel.off("vault:tenants:register", ref1);
    channel.off("vault:tenants:login", ref2);
    channel.off("vault:tenants:tenants", ref3);
    channel.off("vault:tenants:remove", ref4);
}
exports.stop = stop;
//# sourceMappingURL=tenants.js.map
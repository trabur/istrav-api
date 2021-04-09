"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtCheck = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const jwtCheck = (req, res, next) => {
    // Get the jwt token from the head
    const authHeader = req.headers["authorization"];
    let token = authHeader.split(' ')[1];
    if (token === null)
        return res.sendStatus(401);
    let jwtPayload;
    // Try to validate the token and get data
    jwt.verify(token, process.env.SECRET, function (err, auth) {
        if (err)
            return res.sendStatus(403);
        req.auth = auth;
        console.log('verify', auth);
        next();
    });
};
exports.jwtCheck = jwtCheck;
//# sourceMappingURL=jwtCheck.js.map
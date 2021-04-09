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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sha512_1 = __importDefault(require("crypto-js/sha512"));
const jwt = __importStar(require("jsonwebtoken"));
function default_1(userRepo, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = req.body.params; // event source
            // perform
            const results = yield userRepo.findOne({
                select: ["id", "email", "password", "username"],
                where: {
                    appId: es.arguements.appId,
                    email: es.arguements.email
                }
            });
            let result;
            let check = sha512_1.default(es.arguements.password).toString();
            if (results) {
                if (results.password === check) {
                    const newToken = jwt.sign({
                        userId: results.id,
                        email: results.email,
                        username: results.username
                    }, process.env.SECRET);
                    result = {
                        data: { token: newToken },
                        success: true // user is auth
                    };
                }
                else {
                    result = {
                        reason: 'invalid password',
                        success: false // user is not auth
                    };
                }
            }
            else {
                result = {
                    reason: 'user not found',
                    success: false // user is not auth
                };
            }
            // add to event source
            es.payload = result;
            es.serverAt = Date.now();
            // log event source
            console.log(`API ${es.arguements.url} ::: ${es}`);
            // finish
            res.json(es);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=login.js.map
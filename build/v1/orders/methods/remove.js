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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
function default_1(orderRep, appRepo, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = req.body.params; // event source
            // authentication
            let decoded = jwt.verify(es.arguements.token, process.env.SECRET);
            console.log('decoded:', decoded);
            // check if userId from token is the owner to provided order id
            const order = yield orderRep.findOne({
                select: ["id"],
                where: {
                    id: es.arguements.id,
                    appId: es.arguements.appId,
                    userId: decoded.userId
                }
            });
            if (!order) {
                // end
                es.payload = {
                    success: false,
                    reason: 'userId from token is not the owner to provided order id or order does not exist'
                };
                es.serverAt = Date.now();
                console.log(`API ${es.arguements.url} ::: ${es}`);
                res.json(es);
            }
            // perform
            let result;
            yield orderRep.delete(order.id)
                .then((data) => {
                console.log('deleted: ', data);
                result = {
                    success: true,
                    data: data
                };
            })
                .catch((err) => {
                console.log('delete err:', err);
                result = {
                    success: false,
                    reason: err.message
                };
            });
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
//# sourceMappingURL=remove.js.map
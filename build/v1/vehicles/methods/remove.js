"use strict";
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
function default_1(vehicleRepo, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // here we will have logic to delete a vehicle by a given vehicle id
            console.log(`REMOVE: /api/${config.version}/${config.endpoint}/${req.params.id}`);
            console.log("--------------------------");
            const results = yield vehicleRepo.delete(req.params.id);
            res.json(results);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=remove.js.map
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
            // here we will have logic to save a vehicle
            console.log(`SAVE: /api/${config.version}/${config.endpoint}`);
            console.log("--------------------------");
            console.log('req.body.params:', req.body.params);
            const vehicle = yield vehicleRepo.create(req.body.params);
            const results = yield vehicleRepo.save(vehicle);
            res.json(results);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=save.js.map
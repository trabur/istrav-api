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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const VehicleViewModel_1 = __importDefault(require("../vehicles/VehicleViewModel"));
const VehicleEventModel_1 = __importDefault(require("../vehicles/VehicleEventModel"));
const typeorm_1 = require("typeorm");
class StoreService {
    constructor(reducers) {
        this.reducers = null;
        this.vehicleViewRepository = null;
        this.vehicleEventRepository = null;
        this.reducers = reducers;
        const config = {
            type: "sqljs",
            location: "demo",
            autoSave: true,
            entities: [
                VehicleViewModel_1.default,
                VehicleEventModel_1.default
            ],
            logging: ['query', 'schema'],
            synchronize: true
        };
        typeorm_1.createConnection(config).then(connection => {
            this.vehicleViewRepository = connection.getRepository(VehicleViewModel_1.default);
            this.vehicleEventRepository = connection.getRepository(VehicleEventModel_1.default);
        });
    }
    store(events) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const event of events) {
                yield this.vehicleEventRepository.save({ eventData: event });
                const viewInDb = yield this.vehicleViewRepository.findOne({ id: event.id });
                if (viewInDb) {
                    const acc = {
                        id: viewInDb.id,
                        amount: viewInDb.amount,
                        currency: viewInDb.currency,
                        createdAt: viewInDb.createdAt
                    };
                    const view = this.reducers.reduce((view, reducer) => reducer(event, view), acc);
                    viewInDb.id = view.id;
                    viewInDb.amount = view.amount;
                    viewInDb.currency = view.currency;
                    viewInDb.createdAt = view.createdAt;
                    yield this.vehicleViewRepository.save(viewInDb);
                }
                else {
                    const view = this.reducers.reduce((view, reducer) => reducer(event, view), {});
                    yield this.vehicleViewRepository.save(view);
                }
            }
            const lastEvent = events[events.length - 1];
            const endView = yield VehicleViewModel_1.default.findOne(lastEvent.id);
            return endView;
        });
    }
    getVehicleView(id) {
        return VehicleViewModel_1.default.findOne(id);
    }
}
exports.StoreService = StoreService;
//# sourceMappingURL=StoreService.js.map
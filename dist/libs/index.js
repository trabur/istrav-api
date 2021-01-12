"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandService = exports.queryService = exports.CreateVehicleCommand = exports.GetVehicleQuery = void 0;
const GetVehicleQuery_1 = require("./vehicles/GetVehicleQuery");
Object.defineProperty(exports, "GetVehicleQuery", { enumerable: true, get: function () { return GetVehicleQuery_1.GetVehicleQuery; } });
const CreateVehicleCommand_1 = require("./vehicles/CreateVehicleCommand");
Object.defineProperty(exports, "CreateVehicleCommand", { enumerable: true, get: function () { return CreateVehicleCommand_1.CreateVehicleCommand; } });
const QueryService_1 = require("./tasks/QueryService");
const CommandService_1 = require("./tasks/CommandService");
let queryService = new QueryService_1.QueryService();
exports.queryService = queryService;
let commandService = new CommandService_1.CommandService();
exports.commandService = commandService;
//# sourceMappingURL=index.js.map
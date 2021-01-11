import { GetVehicleQuery } from "./vehicles/GetVehicleQuery"
import { CreateVehicleCommand } from "./vehicles/CreateVehicleCommand"
import { QueryService } from "./tasks/QueryService"
import { CommandService } from "./tasks/CommandService"

let queryService = new QueryService()
let commandService = new CommandService()

export {
  GetVehicleQuery,
  CreateVehicleCommand,
  queryService,
  commandService
};
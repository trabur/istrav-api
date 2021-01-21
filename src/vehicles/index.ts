import vehicleById from './vehicleById'
import saveVehicle from './saveVehicle'
import allVehicles from "./allVehicles"
import updateVehicle from "./updateVehicle"
import deleteVehicle from "./deleteVehicle"

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

export default function (app, vehicleRepo) {
  app.get("/api/v1/vehicles", allVehicles(vehicleRepo))
  app.get("/api/v1/vehicles/:id", vehicleById(vehicleRepo))
  app.post("/api/v1/vehicles", saveVehicle(vehicleRepo))
  app.put("/api/v1/vehicles/:id", updateVehicle(vehicleRepo))
  app.delete("/api/v1/vehicles/:id", deleteVehicle(vehicleRepo))
  // app.delete("/api/v1/vehicles/:id", [checkJwt, checkRole(["ADMIN"])], deleteVehicle(vehicleRepo))
}
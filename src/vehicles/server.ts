import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

export default function (app, vehicleRepo) {
  app.get("/api/v1/vehicles", all(vehicleRepo))
  app.get("/api/v1/vehicles/:id", get(vehicleRepo))
  app.post("/api/v1/vehicles", save(vehicleRepo))
  app.put("/api/v1/vehicles/:id", update(vehicleRepo))
  app.delete("/api/v1/vehicles/:id", remove(vehicleRepo))
  // app.delete("/api/v1/vehicles/:id", [checkJwt, checkRole(["ADMIN"])], deleteVehicle(vehicleRepo))
}
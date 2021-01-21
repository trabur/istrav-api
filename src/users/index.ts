import userById from './userById'
import saveUser from './saveUser'
import allUsers from "./allUsers"
import updateUser from "./updateUser"
import deleteUser from "./deleteUser"

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

export default function (app, userRepo) {
  app.get("/api/v1/users", allUsers(userRepo))
  app.get("/api/v1/users/:id", userById(userRepo))
  app.post("/api/v1/users", saveUser(userRepo))
  app.put("/api/v1/users/:id", updateUser(userRepo))
  app.delete("/api/v1/users/:id", [checkJwt, checkRole(["ADMIN"])], deleteUser(userRepo))
}
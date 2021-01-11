import express from "express"
const app = express();

import "reflect-metadata";
import { 
  GetVehicleQuery, 
  CreateVehicleCommand, 
  queryService, 
  commandService 
} from "./libs";

app.use(express.json());

app.get("/api/v1/vehicles/:id", async (req, res) => {
  const q = new GetVehicleQuery(req.params.id);
  console.log("Getting vehicle");
  console.log("--------------------------");
  const vehicles = await queryService.runQuery(q);
  res.json(vehicles);
});

app.post("/api/v1/vehicles", (req, res) => {
  const vehicle = { amount: parseFloat(req.body.number), currency: "SEK" };
  const c = new CreateVehicleCommand(vehicle);
  // We want to allow maximum throughput so we don't wait for the write to happen before returning a response.
  wait(2000, () => {
    console.log("Creating vehicle", vehicle);
    console.log("--------------------------");
    commandService.runCommand(c)
  });

  res.json(vehicle);
});

export default app;

const wait = (timeout, fn) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  })
};
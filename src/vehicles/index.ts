import { Request, Response } from "express"

export default function (app, vehicleRepo) {
  // allVehicles
  app.get("/api/v1/vehicles", async function (req: Request, res: Response) {
    // here we will have logic to return all vehicles
    console.log("All vehicles")
    console.log("--------------------------")
    const vehicles = await vehicleRepo.find()
    res.json(vehicles)
  })
  
  // vehicleById
  app.get("/api/v1/vehicles/:id", async function (req: Request, res: Response) {
    // here we will have logic to return vehicle by id
    console.log("Vehicle by id")
    console.log("--------------------------")
    const results = await vehicleRepo.findOne(req.params.id)
    res.json(results)
  })
  
  // saveVehicle
  app.post("/api/v1/vehicles", async function (req: Request, res: Response) {
    // here we will have logic to save a vehicle
    console.log("Save vehicle")
    console.log("--------------------------")
    const vehicle = await vehicleRepo.create(req.body)
    const results = await vehicleRepo.save(vehicle)
    res.json(results)
  })
  
  // updateVehicle
  app.put("/api/v1/vehicles/:id", async function (req: Request, res: Response) {
    // here we will have logic to update a vehicle by a given vehicle id
    console.log("Update vehicle")
    console.log("--------------------------")
    const vehicle = await vehicleRepo.findOne(req.params.id)
    vehicleRepo.merge(vehicle, req.body)
    const results = await vehicleRepo.save(vehicle)
    res.json(results)
  })
  
  // deleteVehicle
  app.delete("/api/v1/vehicles/:id", async function (req: Request, res: Response) {
    // here we will have logic to delete a vehicle by a given vehicle id
    console.log("Delete vehicle")
    console.log("--------------------------")
    const results = await vehicleRepo.delete(req.params.id)
    res.json(results)
  })
}
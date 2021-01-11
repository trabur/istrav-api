import storeService from "../store"
import { v4 as uuidv4 } from 'uuid'
import { CreateVehicle } from "./events"

export class CreateVehicleCommand {
  constructor(vehicle) {
    this.vehicle = vehicle;
  }
  vehicle = null

  run() {
    const id = uuidv4();
    const event = CreateVehicle(id, this.vehicle);
    const events = [event];
    return storeService.store(events)
  }
}
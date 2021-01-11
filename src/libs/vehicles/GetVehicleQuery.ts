import storeService from "../store"

export class GetVehicleQuery {
  constructor(id) {
    this.id = id;
  }
  id = null

  run() {
    return storeService.getVehicleView(this.id);
  }
}

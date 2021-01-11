import vehicleReducer from "../vehicles/vehicleReducer"
import { StoreService } from "./StoreService"

const reducers = [
  vehicleReducer
];

let ss = new StoreService(reducers);
export default ss
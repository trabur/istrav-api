
// unique place
import { v4 as uuidv4 } from 'uuid'
let roomId = uuidv4()

// event source
let saveVehicle = {
  respondIn: roomId,
  message: JSON.stringify({
    name: 'my-vehicle',
    lat: '30.3074624',
    long: '-98.0335911'
  })
}

// event source
let vehicleById = {
  respondIn: roomId,
  message: JSON.stringify({
    id: '123'
  })
}

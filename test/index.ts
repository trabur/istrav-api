import { v4 as uuidv4 } from 'uuid'

import Vehicles from '../src/vehicles/library'

async function main(host) {
  let vehicles = new Vehicles(host)
  console.log('vehicles', vehicles)

  try {
    // create a new vehicle
    let vehicle = await vehicles.saveVehicle({
      id: uuidv4(),
      name: 'my-vehicle',
      lat: '30.3074624',
      long: '-98.0335911'
    })
    console.log('new vehicle', vehicle)

    // get that vehicle by id
    let myVehicle = await vehicles.vehicleById(vehicle.id)
    console.log('my-vehicle', myVehicle)
    
    // change vehicle position
    let movedVehicle = await vehicles.updateVehicle(myVehicle.id, { 
      lat: '30.3074625',
      long: '-98.0335912'
    })
    console.log('movedVehicle', movedVehicle)

    // now remove the vehicle
    let deletedVehicle = await vehicles.deleteVehicle(movedVehicle.id)
    console.log('deletedVehicle', deletedVehicle)

    // get all vehicles
    let allVehicles = await vehicles.allVehicles()
    console.log('allVehicles', allVehicles)
  } catch (error) {
    console.error(error);
  }
}

main('http://localhost:3000')
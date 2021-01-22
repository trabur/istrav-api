import Vehicles from './Library'

async function main() {
  let config = { 
    host: 'http://localhost:3000',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyYXZpcy5idXJhbmR0QGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYxMTI5NTQ2MSwiZXhwIjoxNjExMjk5MDYxfQ.yaJFndogCYeOx5K8wljDePOiQT8Lud_gK38psryr69Q'
  }

  let vehicles = new Vehicles(config)
  console.log('vehicles', vehicles)

  try {
    // create a new vehicle
    let vehicle = await vehicles.save({
      name: 'my-vehicle',
      lat: '30.3074624',
      long: '-98.0335911'
    })
    console.log('new vehicle', vehicle)

    // get that vehicle by id
    let myVehicle = await vehicles.get(vehicle.id)
    console.log('my-vehicle', myVehicle)
    
    // change vehicle position
    let movedVehicle = await vehicles.update(myVehicle.id, { 
      lat: '30.3074625',
      long: '-98.0335912'
    })
    console.log('movedVehicle', movedVehicle)

    // get all vehicles
    let allVehicles = await vehicles.all()
    console.log('allVehicles', allVehicles)
    
    // now remove the vehicle
    let deletedVehicle = await vehicles.remove(movedVehicle.id)
    console.log('deletedVehicle', deletedVehicle)
  } catch (error) {
    console.error(error);
  }
}

main()
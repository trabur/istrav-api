const eventTypes = {
  createVehicle: "CreateVehicle"
};

function CreateVehicle (id, vehicle: any) {
  return {
    type: eventTypes.createVehicle,
    id,
    name: vehicle.name,
    lat: vehicle.lat,
    long: vehicle.long
  }
}

export {
  eventTypes,
  CreateVehicle
} 
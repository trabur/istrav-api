import { v4 as uuidv4 } from 'uuid'

import Users from './Library'

async function main(config) {
  let users: any = new Users(config)
  console.log('users', users)

  try {
    // create a new user
    let user = await users.save({
      id: uuidv4(),
      name: 'my-user',
      lat: '30.3074624',
      long: '-98.0335911'
    })
    console.log('new user', user)

    // get that user by id
    let myVehicle = await users.get(user.id)
    console.log('my-user', myVehicle)
    
    // change user position
    let movedVehicle = await users.update(myVehicle.id, { 
      lat: '30.3074625',
      long: '-98.0335912'
    })
    console.log('movedVehicle', movedVehicle)

    // now remove the user
    let deletedVehicle = await users.remove(movedVehicle.id)
    console.log('deletedVehicle', deletedVehicle)

    // get all users
    let allVehicles = await users.all()
    console.log('allVehicles', allVehicles)
  } catch (error) {
    console.error(error);
  }
}

main({ 
  host: 'http://localhost:3000'
})
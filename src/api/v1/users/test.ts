import Users from './Library'

async function main(config) {
  let users = new Users(config)
  console.log('users', users)

  try {
    // create a new user
    let user = await users.register({
      email: 'travis.burandt@gmail.com',
      username: 'cool-user',
      password: 'my-password',
      firstName: 'john',
      lastName: 'doe',
      role: 'ADMIN'
    })
    console.log('new user', user)

    // get that user by id
    let myUser = await users.get(user.email)
    console.log('my-user', myUser)
    
    // change user position
    let updatedUser = await users.update(myUser.email, { 
      firstName: 'someone',
      lastName: 'else'
    })
    console.log('updatedUser', updatedUser)

    // get all users
    let allUsers = await users.all()
    console.log('allUsers', allUsers)
    
    // now remove the user
    let deletedUser = await users.remove(updatedUser.email)
    console.log('deletedUser', deletedUser)

  } catch (error) {
    console.error(error);
  }
}

main({ 
  host: 'http://localhost:3000'
})
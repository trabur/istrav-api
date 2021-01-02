const jwt = require('jsonwebtoken')
import sha512 from 'crypto-js/sha512'

// method
export default function (prisma: any, channel: any) {
  // trigger
  return async function (data: any) {
    // convert password to hash
    let pw = sha512(data.message.payload.password).toString()
    
    // does the account exist?
    const checkExist = await prisma.user.findUnique({
      where: {
        email: data.message.payload.email
      }
    })
    
    // validate account
    let msg 
    if (checkExist) {
      // check username & password combo
      if (checkExist.password !== pw) {
        // passwords do not match
        msg = {
          error: 3,
          reason: 'invalid password'
        }
      } else {
        // make json web token for the account
        msg = {
          account: checkExist,
          token: jwt.sign({
            user: checkExist.id
          }, '1337-secret-shhhhh', { expiresIn: '1h' })
        }
      }
    } else {
      // account does not exist
      msg = {
        error: 2,
        reason: 'invalid email address'
      }
    }

    // respond
    channel.push("room:broadcast", {
      room: data.message.output,
      message: msg
    })
  }
}
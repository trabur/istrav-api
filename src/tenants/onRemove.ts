const jwt = require('jsonwebtoken')
import sha512 from 'crypto-js/sha512'

// method
export default function (prisma: any, channel: any) {
  // trigger
  return async function (data: any) {
    // convert password to hash
    let pw = sha512(data.message.payload.password).toString()
    
    // get rid of the account
    const user = await prisma.user.delete({
      where: {
        email: data.message.payload.email
      }
    })

    // respond
    channel.push("room:broadcast", {
      room: data.message.output,
      message: user
    })
  }
}
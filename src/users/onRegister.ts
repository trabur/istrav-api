import sha512 from 'crypto-js/sha512'
const jwt = require('jsonwebtoken')

// method
export default function (prisma: any, channel: any) {
  // trigger
  return async function (data: any) {
    // does the account already exist?
    const checkExist = await prisma.user.findUnique({
      where: {
        email: data.message.payload.email
      }
    })

    if (checkExist) {
      // respond
      channel.push("room:broadcast", {
        room: data.message.output,
        message: {
          error: 1,
          reason: `the account ${data.message.payload.email} already exists`
        }
      })

      return // it exists; we have no need to continue creation
    }

    // convert password to hash
    data.message.payload.password = sha512(data.message.payload.password).toString()

    // save to db
    const user = await prisma.user.create({ data: data.message.payload })

    // respond
    channel.push("room:broadcast", {
      room: data.message.output,
      message: {
        account: user,
        token: jwt.sign({
          user: user.id
        }, '1337-secret-shhhhh', { expiresIn: '1h' })
      }
    })
  }
}
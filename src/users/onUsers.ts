// method
export default function (prisma: any, channel: any) {
  // trigger
  return async function (data: any) {
    const allUsers = await prisma.user.findMany()

    channel.push("room:broadcast", {
      room: data.message.output,
      message: allUsers
    })
  }
}
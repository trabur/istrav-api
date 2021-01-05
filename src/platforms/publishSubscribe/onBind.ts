// method
export default function (prisma: any, channel: any) {
  // trigger
  return async function (data: any) {
    console.log('hello from onBind')
  }
}
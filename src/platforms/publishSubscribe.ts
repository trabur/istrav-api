// listener references
let ref1: any
let ref2: any

// listener functions
import onBind from './publishSubscribe/onBind'
import onTrigger from './publishSubscribe/onTrigger'

/******
 * trigger methods
 ******/
function run (prisma, channel) { 
  // start listening
  ref1 = channel.on("room:platforms:publishSubscribe:bind", onBind(prisma, channel))
  ref2 = channel.on("room:platforms:publishSubscribe:trigger", onTrigger(prisma, channel))
}

function stop (channel) { 
  // quit listening
  channel.off("room:platforms:publishSubscribe:bind", ref1)
  channel.off("room:platforms:publishSubscribe:trigger", ref2)
}

/******
 * trigger library
 ******/
export {
  stop,
  run,
}
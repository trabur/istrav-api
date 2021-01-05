// listener references
let ref1: any
let ref2: any

// listener functions
import onManual from './counter/onManual'
import onTick from './counter/onTick'

/******
 * trigger methods
 ******/
function run (prisma, channel) { 
  // start listening
  ref1 = channel.on("room:platforms:counter:manual", onManual(prisma, channel))
  ref2 = channel.on("room:platforms:counter:tick", onTick(prisma, channel))
}

function stop (channel) { 
  // quit listening
  channel.off("room:platforms:counter:manual", ref1)
  channel.off("room:platforms:counter:tick", ref2)
}

/******
 * trigger library
 ******/
export {
  stop,
  run,
}
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
  ref1 = channel.on("vault:platforms:counter:manual", onManual(prisma, channel))
  ref2 = channel.on("vault:platforms:counter:tick", onTick(prisma, channel))
}

function stop (channel) { 
  // quit listening
  channel.off("vault:platforms:counter:manual", ref1)
  channel.off("vault:platforms:counter:tick", ref2)
}

/******
 * trigger library
 ******/
export {
  stop,
  run,
}
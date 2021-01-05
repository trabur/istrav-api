// listener references
let ref1: any
let ref2: any

// listener functions
import onSave from './logging/onSave'
// import onTick from './users/onTick'

/******
 * trigger methods
 ******/
function run (prisma, channel) { 
  // start listening
  ref1 = channel.on("room:platforms:logging:save", onSave(prisma, channel))
  // ref2 = channel.on("room:platforms:counter:tick", onTick(prisma, channel))
}

function stop (channel) { 
  // quit listening
  channel.off("room:platforms:logging:save", ref1)
  // channel.off("room:platforms:counter:tick", ref2)
}

/******
 * trigger library
 ******/
export {
  stop,
  run,
}
// listener references
let ref1: any
let ref2: any
let ref3: any
let ref4: any

// listener functions
import onRegister from './users/onRegister'
import onLogin from './users/onLogin'
import onUsers from './users/onUsers'
import onRemove from './users/onRemove'

/******
 * trigger methods
 ******/
function run (prisma, channel) { 
  // start listening
  ref1 = channel.on("vault:users:register", onRegister(prisma, channel))
  ref2 = channel.on("vault:users:login", onLogin(prisma, channel))
  ref3 = channel.on("vault:users:users", onUsers(prisma, channel))
  ref4 = channel.on("vault:users:remove", onRemove(prisma, channel))
}

function stop (channel) { 
  // quit listening
  channel.off("vault:users:register", ref1)
  channel.off("vault:users:login", ref2)
  channel.off("vault:users:users", ref3)
  channel.off("vault:users:remove", ref4)
}

/******
 * trigger library
 ******/
export {
  stop,
  run,
}
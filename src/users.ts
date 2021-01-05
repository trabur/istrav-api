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
  ref1 = channel.on("room:users:register", onRegister(prisma, channel))
  ref2 = channel.on("room:users:login", onLogin(prisma, channel))
  ref3 = channel.on("room:users:users", onUsers(prisma, channel))
  ref4 = channel.on("room:users:remove", onRemove(prisma, channel))
}

function stop (channel) { 
  // quit listening
  channel.off("room:users:register", ref1)
  channel.off("room:users:login", ref2)
  channel.off("room:users:users", ref3)
  channel.off("room:users:remove", ref4)
}

/******
 * trigger library
 ******/
export {
  stop,
  run,
}
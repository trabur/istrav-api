// listener references
let ref1: any
let ref2: any
let ref3: any
let ref4: any

// listener functions
import onRegister from './tenants/onRegister'
import onLogin from './tenants/onLogin'
import onTenants from './tenants/onTenants'
import onRemove from './tenants/onRemove'

/******
 * trigger methods
 ******/
function run (prisma, channel) { 
  // start listening
  ref1 = channel.on("room:tenants:register", onRegister(prisma, channel))
  ref2 = channel.on("room:tenants:login", onLogin(prisma, channel))
  ref3 = channel.on("room:tenants:tenants", onTenants(prisma, channel))
  ref4 = channel.on("room:tenants:remove", onRemove(prisma, channel))
}

function stop (channel) { 
  // quit listening
  channel.off("room:tenants:register", ref1)
  channel.off("room:tenants:login", ref2)
  channel.off("room:tenants:tenants", ref3)
  channel.off("room:tenants:remove", ref4)
}

/******
 * trigger library
 ******/
export {
  stop,
  run
}
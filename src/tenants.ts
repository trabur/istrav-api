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
  ref1 = channel.on("vault:tenants:register", onRegister(prisma, channel))
  ref2 = channel.on("vault:tenants:login", onLogin(prisma, channel))
  ref3 = channel.on("vault:tenants:tenants", onTenants(prisma, channel))
  ref4 = channel.on("vault:tenants:remove", onRemove(prisma, channel))
}

function stop (channel) { 
  // quit listening
  channel.off("vault:tenants:register", ref1)
  channel.off("vault:tenants:login", ref2)
  channel.off("vault:tenants:tenants", ref3)
  channel.off("vault:tenants:remove", ref4)
}

/******
 * trigger library
 ******/
export {
  stop,
  run
}
// libraries
import { PrismaClient } from '../prisma/node_modules/.prisma/client'
const prisma = new PrismaClient()
import { v4 as uuidv4 } from 'uuid';

// elixir socket
var w3cwebsocket = require("websocket").w3cwebsocket
var Socket = require("phoenix").Socket
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", {transport: w3cwebsocket})
socket.connect()

// phoenix channel
let channel = socket.channel("MAIN", {token: "abc"})
channel.join()
  .receive("ok", ({ messages }: any) => console.log("tenants: joined MAIN channel", messages))
  .receive("error", ({ reason }: any) => console.log("tenants: failed to join MAIN channel", reason))
  .receive("timeout", () => console.log("still waiting..."))

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
function run () { 
  // start listening
  ref1 = channel.on("room:register", onRegister(prisma, channel))
  ref2 = channel.on("room:login", onLogin(prisma, channel))
  ref3 = channel.on("room:tenants", onTenants(prisma, channel))
  ref4 = channel.on("room:remove", onRemove(prisma, channel))
}

function stop () { 
  // quit listening
  channel.off("room:register", ref1)
  channel.off("room:login", ref2)
  channel.off("room:tenants", ref3)
  channel.off("room:remove", ref4)
}


/******
 * trigger library
 ******/
export {
  stop,
  run,
}
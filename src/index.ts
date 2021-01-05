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
  .receive("ok", ({ messages }: any) => console.log("joined MAIN channel", messages))
  .receive("error", ({ reason }: any) => console.log("failed to join MAIN channel", reason))
  .receive("timeout", () => console.log("still waiting..."))

import * as users from './users'
import * as tenants from './tenants'
import * as platforms from './platforms'
// import * as services from './services'

users.run(prisma, channel)
tenants.run(prisma, channel)

platforms.publishSubscribe.run(prisma, channel)
platforms.logging.run(prisma, channel)
platforms.counter.run(prisma, channel)
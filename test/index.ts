// elixir socket
var w3cwebsocket = require("websocket").w3cwebsocket
var Socket = require("phoenix").Socket
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", {
  params: { key: "test.js" },
  transport: w3cwebsocket
})
socket.connect()

// phoenix channel
let channel = socket.channel(`vehicles:lobby`, {})
channel.join()
  .receive("ok", ({ messages }: any) => console.log("joined vehicles:lobby channel", messages))
  .receive("error", ({ reason }: any) => console.log("failed to join vehicles:lobby channel", reason))
  .receive("timeout", () => console.log("still waiting..."))

// unique place
import { v4 as uuidv4 } from 'uuid'
let roomId = uuidv4()

// my phoenix channel
let myChannel = socket.channel(`vehicles:${roomId}`, {})
myChannel.join()
  .receive("ok", ({ messages }: any) => console.log(`joined vehicles:${roomId} channel`, messages))
  .receive("error", ({ reason }: any) => console.log(`failed to join vehicles:${roomId} channel`, reason))
  .receive("timeout", () => console.log("still waiting..."))

// event source
let saveVehicle = {
  respondIn: roomId,
  message: JSON.stringify({
    name: 'my-vehicle',
    lat: '30.3074624',
    long: '-98.0335911'
  })
}

// event source
let vehicleById = {
  respondIn: roomId,
  message: JSON.stringify({
    id: '123'
  })
}

myChannel.on('saveVehicle', function (data) {
  console.log('created:', data)
})

myChannel.on('vehicleById', function (data) {
  console.log('found:', data)
})

setTimeout(() => {
  channel.push('saveVehicle', saveVehicle)
  channel.push('vehicleById', vehicleById)
}, 2000);
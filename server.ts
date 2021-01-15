import app from "./src/app"

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log("Running server on port:", port)
  console.log("--------------------------")
});

// elixir socket
var w3cwebsocket = require("websocket").w3cwebsocket
var Socket = require("phoenix").Socket
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", {
  params: { key: "server.js" },
  transport: w3cwebsocket
})
socket.connect()

// phoenix channel
let channel = socket.channel(`vehicles:lobby`, {})
channel.join()
  .receive("ok", ({ messages }: any) => console.log("joined vehicles:lobby channel", messages))
  .receive("error", ({ reason }: any) => console.log("failed to join vehicles:lobby channel", reason))
  .receive("timeout", () => console.log("still waiting..."))

import * as Amqp from "amqp-ts"

var connection = new Amqp.Connection("amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef")

let allVehiclesExchange = connection.declareExchange("allVehiclesExchange")
let allVehiclesQueue = connection.declareQueue("allVehiclesQueue", { durable: false })

allVehiclesQueue.bind(allVehiclesExchange)
allVehiclesQueue.activateConsumer((message) => {
  console.log(message.getContent())
  message.ack()
})

let vehicleByIdExchange = connection.declareExchange("vehicleByIdExchange")
let vehicleByIdQueue = connection.declareQueue("vehicleByIdQueue", { durable: false })

import vehicleById from './src/vehicles/vehicleById'

vehicleByIdQueue.bind(vehicleByIdExchange)
vehicleByIdQueue.activateConsumer((message) => {
  vehicleById(socket, message)
});

connection.completeConfiguration().then(() => {
  console.log('ready to send/recieve messages:')
  console.log("--------------------------")
});
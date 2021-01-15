import request from 'request'

export default function (socket, message) {
  let content = JSON.parse(message.getContent())
  let event = JSON.parse(content.message)
  console.log("vehicleById event")
  console.log("--------------------------")
  console.log('content', content)
  console.log('event', event)

  // send callback to this place
  let roomId = `vehicles:${content.respondIn}` // 'vehicles:my-secret-room'
  
  // phoenix channel
  let channel = socket.channel(roomId, {})
  channel.join()
    .receive("ok", ({ messages }: any) => console.log(`joined ${roomId} channel`, messages))
    .receive("error", ({ reason }: any) => console.log(`failed to join ${roomId} channel`, reason))
    .receive("timeout", () => console.log("still waiting..."))
    
  request(`http://localhost:3000/api/v1/vehicles/${event.id}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log("vehicleById api")
    console.log("--------------------------")
    console.log('body', body)
  
    // check if object exists
    if (body === undefined) {
      // respond
      channel.push('vehicleById', { 
        error: 3,
        reason: "object can't be found by id"
      })
    } else {
      // respond
      channel.push('vehicleById', body)
    }

    message.ack()
  })
}

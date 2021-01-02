let rooms = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
let users = ['alice:password', 'bob:123', 'carl:secret'] // stored in username & password combo
let roomLimit = 2 // the maximum number of rooms a user may be in
let transferDelay = 0.25 // it takes 0.25 seconds in order to make a room connection
let lobby = 1 // the room where each user starts

// because @alice and @bob are in the lobby with @carl
// their communications are not secure between one another
let channel1 = {
  1: ['alice', 'bob', 'carl']
}

// @alice and @bob need to find their own unique room #s
let channel2 = {
  10: ['alice'],
  15: ['bob']
}

// together now:
let channel3 = {
  1: ['alice', 'bob', 'carl'], 
  10: ['alice'],
  11: [],
  12: ['earth', 'carl'],
  13: [],
  14: [],
  15: ['bob'],
  16: [],
  17: []
}

// @carl wont be able to track which room #s @alice and @bob are in
// for this simple demo there are only 16 room numbers however,
// in production room ids are GUIDs so tracking becomes impossible

function message(channel: any, room: any, data: any) {
  channel[room].forEach((user: any) => {
    console.log(`#${room} --> @${user} ::: ${data}`)
  });
}


console.log('@alice and @bob are stuck in the lobby or room #1 and want to return back to their home planets.')
message(channel3, 1, 'hello world')

console.log('the locations of their home planet was recorded however was not backed up to other locations. connections between users is the only thing secure while connections to the outside or @carl are not to be trusted.')
message(channel3, 12, 'Earth')

console.log('so @bob and @alice need to count on each other if they want to get back to their home planets.')
message(channel3, 15, '@alice home is Earth')
message(channel3, 10, '@bob home is Earth')

console.log('now, if @alice and @bob want to go home then all they need to do is jump to room #12')
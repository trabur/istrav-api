import * as users from '../src/users'

/**
 * users
 */
// init users library
users.run()

// show all
users.all(function ({ message }: any) {
  console.log('users.all :::', message)
})

// auth confirm
let email = 'test@test.com'
let username = 'testman'
let password = '1234567'
// users.register(email, username, password, function ({ message }: any) {
//   console.log('users.register :::', message)
// })

// auth check
users.login(email, password, function ({ message }: any) {
  console.log('users.login :::', message)
})

// auth delete
// users.remove(email, password, function ({ message }: any) {
//   console.log('users.remove :::', message)
// })

/**
 * demo
 */
let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNDM4N2FjNzEtYTkyOC00MGJjLTg4M2UtOTk4OThiZTAyNDVlIiwiaWF0IjoxNjA4MzI1Nzg4LCJleHAiOjE2MDgzMjkzODh9.yJFZVTDXpE_eqortIeWm2kacbZGnGBTElnExg66G554'
let tenantId = ''

// auth tenant
// users.tenant(userToken, tenantId, function ({ message }: any) {
//   console.log('users.tenant :::', message)
// })

/**
 * demo
 */
let tenantToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNDM4N2FjNzEtYTkyOC00MGJjLTg4M2UtOTk4OThiZTAyNDVlIiwiaWF0IjoxNjA4MzI1Nzg4LCJleHAiOjE2MDgzMjkzODh9.yJFZVTDXpE_eqortIeWm2kacbZGnGBTElnExg66G554'

// import * as tenants from '../src/tenants'

/**
 * tenants
 */
// init tenants library
// tenants.run()

// show all my tenants
// tenants.all(userToken, function ({ message }: any) {
//   console.log('users.all :::', message)
// })

// register my own tenant
let name = 'Demo Corp'

// each tenant has it's own platform
let platformBilling = {
  publishSubscribe: true,
  counter: true,
  keyValue: true,
  ping: true,
  cron: true,
  leaderElection: true,
  accounts: true,
  schedule: true,
  cryptoKeyValue: true,
  directMessage: true,
}

// tenant services running ontop
let servicesBilling = {
  members: true,
  forums: true,
  gallery: true
}

// start name(service/platform)
// tenants.create(userToken, name, platform, services, function ({ message }: any) {
//   console.log('tenants.create :::', message)
// })

// import * as platform from '../src/tenants/platform'

/**
 * cron
 */
// init cron library
// platform.cron.run()

// show all
// platform.cron.all(function ({ message }: any) {
//   console.log('cron.all :::', message)
// })

// create cron
let cronId = 'demo'
let status = true
let time = `* * * * * *`
let job = function () {
  // You will see this message every second
  console.log('cron.job ::: hello world')
}
// platform.cron.start(cronId, status, time, job)

// change cron status to true
// platform.cron.go(cronId) // run

// change cron status to false
// platform.cron.stop(cronId) // halt








// stop all libraries
setTimeout(() => {
  users.stop()
  // cron.stop()
}, 10000);
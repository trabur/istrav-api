import * as users from './users'
import * as tenants from './tenants'
import * as platform from './tenants/platform'
import * as services from './tenants/services'

users.run()
tenants.run()
// platform.run()
// services.run()
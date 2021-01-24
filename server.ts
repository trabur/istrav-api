import express from "express"

import v1 from "./src/v1/app"

const app = express()
const port = process.env.PORT || 3000

// init api
v1(app)

// welcome screen
app.get('/*', express.static('public'))

// run
app.listen(port, () => {
  console.log("Running server on port:", port)
  console.log("--------------------------")
});
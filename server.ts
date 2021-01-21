import express from "express"

import v1 from "./src/api/v1/app"

const app = express()
const port = process.env.PORT || 3000

// init api
v1(app)

// run
app.listen(port, () => {
  console.log("Running server on port:", port)
  console.log("--------------------------")
});
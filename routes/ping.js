import express from "express"
const pingRouter = express.Router()

pingRouter.get("/", (req, res) => {
  res.send("pong")
})

export default pingRouter
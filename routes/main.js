import express from "express"
const mainRouter = express.Router()

mainRouter.get("/", (req, res) => {
  res.send("Hello World!")
})

export default mainRouter
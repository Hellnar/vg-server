import express from "express"
import getStats from "../controllers/stats/getStats.js"

const statsRouter = express.Router()

statsRouter.get("/", (req, res) => getStats(req, res))

export default statsRouter
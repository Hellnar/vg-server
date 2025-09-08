import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Server } from "socket.io"
import { createServer } from "http"

dotenv.config()
const app = express()
const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
    },
})

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id)
})

app.use(cors())

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

import pingRoutes from "./routes/ping.js"
import projectsRoutes from "./routes/projects.js"
import statsRoutes from "./routes/stats.js"

app.use("/api/ping", pingRoutes)
app.use("/api/projects", projectsRoutes)
app.use("/api/stats", statsRoutes)

server.listen(3000, () => {
  console.log("Server is running on port 3000")
})
import express from "express"
import addProject from "../controllers/addProject.js"
import upload from "../middleware/upload.js"
import getProjects from "../controllers/getProjects.js"
import getProject from "../controllers/getProject.js"
import deleteProject from "../controllers/deleteProject.js"
import getLeads from "../controllers/getLeads.js"
import downloadProject from "../controllers/downloadProject.js"
import { processingProject } from "../controllers/processingProject.js"
import updateProject from "../controllers/updateProject.js"

const projectsRouter = express.Router()

projectsRouter.get("/", (req, res) => getProjects(req, res))
projectsRouter.get("/:query", (req, res) => getProject(req, res))
projectsRouter.post("/", upload.single("attachments"), async (req, res) => addProject(req, res))
projectsRouter.delete("/:id", (req, res) => deleteProject(req, res))
projectsRouter.get("/:id/leads", async (req, res) => getLeads(req, res))
projectsRouter.get("/:id/download", async (req, res) => downloadProject(req, res))
projectsRouter.post("/:id/processing", async (req, res) => processingProject(req, res))
projectsRouter.put("/:id", async (req, res) => updateProject(req, res))

export default projectsRouter
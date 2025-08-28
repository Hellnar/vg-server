import { supabase } from "../server.js"
import { io } from "../server.js"
import { processingSimulateApi } from "../utils/projects/processingSimulateApi.js"
import { updateLeads } from "../utils/projects/updateLeads.js"

export async function processingProject(req, res) {
    try {
        const { id } = req.params
        const { service, type } = req.query

        const { data, error } = await supabase
            .from("leads")
            .select("*")
            .eq("project_id", id)
            .not("link", "is", null)
            .neq("link", "");  

        console.log(`Processing ${data.length} leads | Service: ${service} | Type: ${type}`)
        res.status(200).json({message: "Processing"})

        await supabase
            .from("projects")
            .update({ status: "Processing" })
            .eq("id", id)


        let processingResult // {status, countLeads, errors}
        if(service === "simulate") processingResult = await processingSimulateApi(data, id)      
        if(service === "rapid-scraping") processingResult = await processingRapidScraping(data, id)

        await updateLeads(processingResult.updatedLeads)

        const { count: countLeads, error: countError } = await supabase
            .from("leads")
            .select("id", { count: "exact", head: true })
            .eq("project_id", id)
            .eq("is_processed", true)

        console.log(`Project ${id} has ${countLeads} processed leads`)

        await supabase
            .from("projects")
            .update({ status: "Completed", processed: countLeads })
            .eq("id", id)

        io.emit("processing-done", { id, status: "Completed" })
    } catch(err) {
        console.error("Error processing: ", err);
        if(!res.headersSent) {
            res.status(500).json({message: "Error processing"})
        }
    }
}
import { supabase } from "../server.js"

export default async function getLeads(req, res) {
    console.log(`getLeads`)
    const projectId = req.params.id;
    try {
        const { data, error } = await supabase
            .from("leads")
            .select("*")
            .eq("project_id", projectId)
        console.log(`Getting leads for project ${projectId}`)
        if(error) return res.status(500).json({message: "Error getting leads"})
        return res.status(200).json(data)
    } catch(err) {
        console.error("Error getting leads: ", err);
        res.status(500).json({message: "Error getting leads"})  
    }
}
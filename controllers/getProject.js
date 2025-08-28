import { supabase } from "../server.js"
export default async function getProject(req, res) {
    try {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .ilike("name", `%${req.params.query}%`)
        console.log(`Getting project ${req.params.query}`)
        if(error) return res.status(500).json({message: "Error getting project"})
        return res.status(200).json(data)
    } catch(err) {
        console.error("Error getting project: ", err);
        res.status(500).json({message: "Error getting project"})
    }
    
}
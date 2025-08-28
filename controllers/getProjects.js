import { supabase } from "../server.js"

export default async function getProjects(req, res) {
    try {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
        console.log(`Getting ${data.length} projects`)
        if(error) return res.status(500).json({message: "Error getting projects"})
        return res.status(200).json(data)
    } catch(err) {
        console.error("Error getting projects: ", err);
        res.status(500).json({message: "Error getting projects"})
    }
}
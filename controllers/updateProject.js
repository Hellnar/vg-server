import { supabase } from "../server.js"

export default async function updateProject(req, res) {
    try {
        const { id } = req.params
        const { data, error } = await supabase
            .from("projects")
            .update(req.body)
            .eq("id", id)
            .select()
        if(error) return res.status(500).json({message: "Error updating project"})
        console.log(data)
        return res.status(200).json(data)
    } catch(err) {
        console.error("Error updating project: ", err);
        res.status(500).json({message: "Error updating project"})
    }
}
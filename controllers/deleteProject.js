import { supabase } from "../server.js"

export default async function deleteProject(req, res) {
    const { id } = req.params

    try {
        const { data, error } = await supabase.from("projects").delete().eq("id", id)

        if (error) {
            console.log(error)
            res.status(500).json({ error: "Error deleting project" })
        } else {
            res.status(200).json({ data })
        }
    } catch (error) {
        console.log(error)  
        res.status(500).json({ error: "Error deleting project" })
    }
}
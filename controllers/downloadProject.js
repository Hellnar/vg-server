import { supabase } from "../server.js";
import xlsx from "xlsx";

export default async function downloadProject(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("project_id", id)

        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Failed to fetch project" });
        }

        if (!data) {
            console.log("No project found with id:", id);
            return res.status(404).json({ error: "Project not found" });
        }

        console.log(`Download project witt ${data.length} leads`);

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Leads");

        const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=${id}.xlsx`);

        res.status(200).send(buffer);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch project" });
    }
}       
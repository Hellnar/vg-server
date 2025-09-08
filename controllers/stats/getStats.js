import { supabase } from "../../server.js"

export default async function getStats(req, res) {
    try {
        const { from, to } = req.query;

        // PROJECTS AMOUNT 
        const { count: projectCount, error: projectError } = await supabase
            .from("projects")
            .select("*", { count: "exact", head: true })
            .gte("created_at", from)
            .lte("created_at", to);

        if (projectError) throw projectError;

        // LEADS AMOUNT

        const { data: projectIds, error: idsError } = await supabase
            .from("projects")
            .select("id")
            .gte("created_at", from)
            .lte("created_at", to);

        if (idsError) throw idsError;

        const ids = projectIds.map((p) => p.id);

        let totalLeads = 0;
        if (ids.length > 0) {
            const { count: leadsCount, error: leadsError } = await supabase
                .from("leads")
                .select("*", { count: "exact", head: true })
                .in("project_id", ids);

            if (leadsError) throw leadsError;

            totalLeads = leadsCount;
        }

        console.log("Projects: ", projectCount);
        console.log("Leads: ", totalLeads);
        res.json({ projectCount, totalLeads });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
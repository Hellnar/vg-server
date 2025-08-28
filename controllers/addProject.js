import fs from 'fs';
import path from 'path';
import xlsx from "xlsx";
import { supabase } from "../server.js"

export default async function addProject(req, res) {
    console.log(`Adding project ${req.body.name}`)
    const file = req.file.path

    try {
        const workbook = xlsx.readFile(file);
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        if(!rows) return res.status(400).json({message: "No data in file or file error"});
        console.log("rows: ", rows.length)

        const project = prepareProject(req, rows.length)

        const { data: projectData, error: projectError } = await supabase
            .from("projects")
            .insert(project)
            .select()

        if(projectError) {
            console.log(projectError)
            return res.status(500).json({message: "Error adding project"})
        }

        const leads = prepareLeads(rows, projectData[0].id)

        const { data: leadsData, error: leadsError } = await supabase
            .from("leads")
            .insert(leads)

        if(leadsError) {
            console.log(leadsError)
            await supabase.from("projects").delete().eq("id", projectData[0].id)
            return res.status(500).json({message: "Error adding leads"})
        }

        res.status(200).json({message: `Project ${req.name} added with ${rows.length} leads`})
    } catch(err) {
        console.error("Upload error: ", err);
        res.status(500).json({message: "Upload error"});
    } finally {
        fs.unlinkSync(file, () => {});
    }
}

function prepareProject(req, leads) {
    const project = {
        name: req.body.name,
        leads: leads,
        goal: req.body.goal,
        status: "New",
        priority: req.body.priority,
        processed: 0
    }
    return project
}

function prepareLeads(rows, project_id) {
    const leads = [];
    for(const lead of rows) {
        const currentLead = {
            first_name: lead.first_name || "",
            last_name: lead.last_name || "",
            company: lead.company || "",
            title: lead.title || "",
            link: lead.prooflink || "",
            location: lead.location || "",
            status: "New",
            ov_date: lead.ov_date || "",
            email: lead.email || "",
            phone: lead.phone || "",
            phone_source: lead.phone_source || "",
            is_processed: false,
            project_id: project_id
        }
        leads.push(currentLead);
    }
    return leads
}
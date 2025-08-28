export async function processingRapidScraping(leads) {
    const updatedLeads = leads.map((lead) => {
        return {
            id: lead.id,
            project_id: id,
            email: lead.email,
            is_processed: true
        }
    })

    // const updatedLeads = []
    // const errors = []
    // for(const lead of leads) {
    //     try {
    //         const response = await fetch(`
    //             https://web-scraping-api2.p.rapidapi.com/get-personal-profile?
    //             linkedin_url=${lead.link}&
    //             include_skills=false&
    //             include_certifications=false&
    //             include_publications=false&
    //             include_honors=false&
    //             include_volunteers=false&
    //             include_projects=false&
    //             include_patents=false&
    //             include_courses=false&
    //             include_organizations=false&
    //             include_profile_status=false&
    //             include_company_public_url=false
    //         `,
    //         )
    //         if (!response.ok) {
    //             errors.push(item.id)
    //             throw new Error(`API error for item ${item.id}`);
    //         }
    //         const data = await response.json()
    //         updatedLeads.push({...data, id: lead.id, project_id: id})
    //     } catch(err) {
    //         console.error("Error processing rapid scraping: ", err);
    //     }
    // }
    return {updatedLeads, errors}
}
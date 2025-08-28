export async function processingSimulateApi(leads, id) {

    const updatedLeads = leads.map((lead) => {
        return {
            id: lead.id,
            project_id: id,
            email: lead.email,
            is_processed: true
        }
    })

    return new Promise((resolve) => {
        setTimeout(async () => {
            resolve({updatedLeads, errors: []})
        }, 5000)
    })
    
}
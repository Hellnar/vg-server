export async function processingRapidScraping(leads, id) {
    // const updatedLeads = leads.map((lead) => {
    //     return {
    //         id: lead.id,
    //         project_id: id,
    //         email: lead.email,
    //         is_processed: true
    //     }
    // })

    const leadExample = {
    "data": {
        "about": "Research in AI, human-robot interaction, autonomous vehicles, and machine learning at MIT.",
        "city": "Cambridge",
        "company": "Massachusetts Institute of Technology (MIT)",
        "company_description": "The Massachusetts Institute of Technology (MIT) is a private research university located in Cambridge, Massachusetts.  MIT is devoted to the advancement of knowledge and education of students in areas that contribute to or prosper in an environment of science and technology.",
        "company_domain": "web.mit.edu",
        "company_employee_count": 22792,
        "company_employee_range": "5001-10000",
        "company_industry": "Higher Education",
        "company_linkedin_url": "https://www.linkedin.com/school/mit/",
        "company_logo_url": "https://media.licdn.com/dms/image/v2/D560BAQH-UXRfIDIKug/company-logo_400_400/company-logo_400_400/0/1689799729035/mit_logo?e=1759363200&v=beta&t=ErZpcNDiO8WUS-agEDZgHmd5t4kQseHiRO9SiZrppsQ",
        "company_website": "http://web.mit.edu/",
        "company_year_founded": 1861,
        "connection_count": 28581,
        "country": "United States",
        "current_company_join_month": null,
        "current_company_join_year": 2015,
        "current_job_duration": "10 yrs 8 mos",
        "educations": [
            {
                "activities": "",
                "date_range": "2014",
                "degree": "Doctor of Philosophy (Ph.D.)",
                "end_month": "",
                "end_year": "",
                "field_of_study": "Computer Science",
                "school": "Drexel University",
                "school_id": "5164",
                "school_linkedin_url": "https://www.linkedin.com/company/5164/",
                "school_logo_url": "https://media.licdn.com/dms/image/v2/C510BAQEqp_nXWmHi6Q/company-logo_200_200/company-logo_200_200/0/1631320003902?e=1759363200&v=beta&t=xbZfIusWAKtikII0bUl2c9il71cD9LQKlUBv0MO4E2I",
                "start_month": "",
                "start_year": ""
            }
        ],
        "email": "",
        "experiences": [
            {
                "company": "Massachusetts Institute of Technology (MIT)",
                "company_id": "1503",
                "company_linkedin_url": "https://www.linkedin.com/company/1503",
                "company_logo_url": "https://media.licdn.com/dms/image/v2/D560BAQH-UXRfIDIKug/company-logo_200_200/company-logo_200_200/0/1689799729035/mit_logo?e=1759363200&v=beta&t=A3LqKvVLVOsoqKAtxq9F-Y-MB13Kp0UqYlmgtYApepU",
                "date_range": "2015 - Present",
                "description": "Research in human-centered AI, especially in the context of autonomous vehicles. I'm particularly interested in understanding human-robot collaboration and engineering learning-based methods that enrich that collaboration.",
                "duration": "10 yrs 8 mos",
                "end_month": "",
                "end_year": "",
                "is_current": true,
                "job_type": "",
                "location": "",
                "skills": "",
                "start_month": "",
                "start_year": 2015,
                "title": "Research Scientist"
            },
            {
                "company": "Google",
                "company_id": "1441",
                "company_linkedin_url": "https://www.linkedin.com/company/1441",
                "company_logo_url": "https://media.licdn.com/dms/image/v2/C4D0BAQHiNSL4Or29cg/company-logo_200_200/company-logo_200_200/0/1631311446380?e=1759363200&v=beta&t=lGbuFb5qWVZLEGGoIoOIeOxqIN1jmUR8YjidVVveYnU",
                "date_range": "2014 - 2015",
                "description": "Machine learning research with a focus on active authentication.",
                "duration": "1 yr",
                "end_month": "",
                "end_year": 2015,
                "is_current": false,
                "job_type": "",
                "location": "Mountain View, CA",
                "skills": "",
                "start_month": "",
                "start_year": 2014,
                "title": "Researcher"
            }
        ],
        "first_name": "Lex",
        "follower_count": 1718304,
        "full_name": "Lex Fridman",
        "headline": "Research Scientist, MIT",
        "hq_city": "Cambridge",
        "hq_country": "US",
        "hq_region": "MA",
        "is_creator": true,
        "is_influencer": true,
        "is_premium": true,
        "is_verified": true,
        "job_title": "Research Scientist",
        "languages": [
            {
                "name": "English",
                "proficiency": ""
            },
            {
                "name": "Russian",
                "proficiency": ""
            }
        ],
        "last_name": "Fridman",
        "linkedin_url": "https://www.linkedin.com/in/lexfridman/",
        "location": "Cambridge, Massachusetts, United States",
        "phone": "",
        "profile_id": "7649982",
        "profile_image_url": "https://media.licdn.com/dms/image/v2/C4E03AQHLCrHhGZ0xMg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1519486751887?e=1759363200&v=beta&t=Jl_O6f2hlEyFMElgYNTE5J1JbylbELEBYYn9TwwJ27A",
        "public_id": "lexfridman",
        "school": "Drexel University",
        "state": "Massachusetts",
        "urn": "ACoAAAB0ur4B2dLbFAHKCLO0VHtal_ilBhaBFxM"
    },
    "message": "ok"
}

    const updatedLeads = []
    const errors = []
    for(const lead of leads) {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'web-scraping-api2.p.rapidapi.com',
                    'x-rapidapi-key': process.env.RAPID_SCRAPING_KEY
                }
            }
            const response = await fetch(`
                https://web-scraping-api2.p.rapidapi.com/get-personal-profile?linkedin_url=${lead.link}&include_skills=false&include_certifications=false&include_publications=false&include_honors=false&include_volunteers=false&include_projects=false&include_patents=false&include_courses=false&include_organizations=false&include_profile_status=false&include_company_public_url=false`, options)
            if (!response.ok) {
                console.log(response)
                errors.push(lead.id)
                throw new Error(`API error for item ${lead.id}`);
            }
            const data = await response.json()

            if(!data.data) continue
            const newData = findData(lead, data.data)

            const updatedLead = {
                id: lead.id,
                project_id: id,
                is_processed: true,
                subindustry: "",
                ...newData
            }

            updatedLeads.push(updatedLead)
        } catch(err) {
            console.error("Error processing rapid scraping: ", err);
        }
    }
    console.log(`Updated ${updatedLeads.length} leads`)
    return {updatedLeads, errors}
}

function findData(lead, newInfo) {
    try {
        let data = {}

        data.location = newInfo.location
        data.date_engaged = new Date().toISOString().slice(0, 10)
        if(newInfo.phone) {
            data.phone = newInfo.phone
            data.phone_source = "linkedin"
        }
        
        for(const experience of newInfo.experiences) {
            if(experience.company === lead.company) {
                data.title = experience.title
                data.employees_prooflink = experience.company_linkedin_url
                if(experience.date_range.toLowerCase().includes("present")) {
                    data.status = ""
                } else {
                    data.status = "a"
                }
            }
        }

        if(newInfo.company === lead.company) {
            data.employees = newInfo.company_employee_count
            data.industry = newInfo.company_industry
        }

        if(newInfo.headline.toLowerCase().includes("retired")) data.status = "a"

        data.trust = getTrust(newInfo)

        return data
    } catch(err) {
        console.error("Error processing rapid scraping: ", err);
    }
}

function getTrust(newInfo) {
    if(!newInfo) return 0
    if(newInfo.is_verified) return 100
    if(newInfo.is_premium) return 95
    if(newInfo.follower_count > 10000) return 95
    if(newInfo.connection_count > 500) return 80
    if(newInfo.follower_count > 3000) return 80
    return 0
}
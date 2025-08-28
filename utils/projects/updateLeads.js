import { supabase } from "../../server.js"

const BATCH_SIZE = 250; 

const chunkArray = (arr) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += BATCH_SIZE) {
    chunks.push(arr.slice(i, i + BATCH_SIZE));
  }
  return chunks;
};

export async function updateLeads(leads) {
  const chunks = chunkArray(leads);
    try {
        for (const chunk of chunks) {
            const { data, error } = await supabase
                .from("leads")
                .upsert(chunk, { onConflict: "id" });

            if (error) {
                console.error("Supabase upsert error:", error);
                throw new Error("Supabase upsert error");
            }
        }

        return leads.length;
    } catch(err) {
        console.error("Error updating leads: ", err);
        throw new Error("Error updating leads");
    }
};

import { getAPIKey, createAPIKey } from "@/utils/db";
import { DocumentData } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data  {
    success: boolean;
    api_key?: DocumentData;
    errorMessage?: any;
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {

        if (req.method !== 'POST') {
            res.status(405).send({ success: false, errorMessage: 'Only POST requests allowed' })
            return;
          }

          const { owner } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      
        // get and return API key
        try {    
            const apiKey = await getAPIKey(owner);  
            if (apiKey === undefined) {
              console.log("API key not found, creating one...")
              await createAPIKey(owner);
              const newApiKey = await getAPIKey(owner);
              res.status(200).json({ success: true, api_key: newApiKey  });
            } else {
              res.status(200).json({ success: true, api_key: apiKey  });
            }
            
          } catch (error) {
            res.status(500).json({ success: false, errorMessage: error});
        }
}

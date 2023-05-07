import { getWorkflow } from "@/utils/db";
import { DocumentData } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data  {
    success: boolean;
    workflow?: DocumentData;
    errorMessage?: any;
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {

        if (req.method !== 'POST') {
            res.status(405).send({ success: false, errorMessage: 'Only POST requests allowed' })
            return;
          }

          const { workflow_id } = JSON.parse(req.body);
      
        // get all workflows and return them
        try {    
            const workflow = await getWorkflow(workflow_id);
            res.status(200).json({ success: true, workflow: workflow  });
          } catch (error) {
            res.status(500).json({ success: false, errorMessage: error});
        }
}

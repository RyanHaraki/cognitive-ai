import { updateWorkflow } from "@/utils/db";
import { DocumentData } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data  {
    success: boolean;
    successMessage?: string;
    errorMessage?: any;
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {

        if (req.method !== 'POST') {
            res.status(405).send({ success: false, errorMessage: 'Only POST requests allowed' })
            return;
          }

          const payload = JSON.parse(req.body);

          console.log(payload)
      
        // update the workflow in the db and return success message
        try {    
            await updateWorkflow(payload.workflow_id, payload);
            res.status(200).json({ success: true, successMessage: `Workflow ${payload.workflow_id} updated succesfully`  });
          } catch (error) {
            res.status(500).json({ success: false, errorMessage: error});
        }
}

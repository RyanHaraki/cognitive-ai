import { deleteWorkflow } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data  {
    success: boolean;
    successMessage?: string;
    errorMessage?: any;
}

// TODO: ensure user cannot create multiple workflows with the same name
export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {

        if (req.method !== 'POST') {
            res.status(405).send({ success: false, errorMessage: 'Only POST requests allowed' })
            return;
          }

        // create payload
        const { workflow_id } = JSON.parse(req.body);

        
        // add workflow to db and return success message
        try {    
            await deleteWorkflow(workflow_id);
            res.status(200).json({ success: true, successMessage: `Workflow ${workflow_id} deleted` });
          } catch (error) {
            res.status(500).json({ success: false, errorMessage: error});
        }
}

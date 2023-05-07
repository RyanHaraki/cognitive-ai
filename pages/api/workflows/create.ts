import { createNewWorkflow } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

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
        const { owner_id, name, description } = JSON.parse(req.body);

        const payload = {
            workflow_id: uuidv4(),
            owner_id: owner_id,
            name: name,
            description: description,
        };

        // add workflow to db and return success message
        try {    
            await createNewWorkflow(payload)
            res.status(200).json({ success: true, successMessage: `Workflow ${payload.workflow_id} created` });
          } catch (error) {
            res.status(500).json({ success: false, errorMessage: error});
        }
}

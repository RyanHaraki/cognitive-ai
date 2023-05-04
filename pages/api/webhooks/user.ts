import { IncomingHttpHeaders } from "http";
import { NextApiRequest, NextApiResponse } from "next";


export const config = {
    api: {
        bodyParser: false,
    },
}

// const webhookSecret: string = process.env.WEBHOOK_SECRET;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // verify webhook signature
    
}
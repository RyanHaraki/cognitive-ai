// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// return value from executing a workflow
type Data = {
  name: string
}

// handle workflow execution and return result
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {



  res.status(200).json({ name: 'John Doe' })
}

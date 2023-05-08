import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai';
import { getWorkflow } from '@/utils/db';
import { DocumentData } from 'firebase/firestore';

// return value from executing a workflow
interface Data  {
  success: boolean;
  errorMessage?: any;
  response?: any;
}

const configuration = new Configuration({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// TODO: add authentication
// TODO: get request to DB to get workflow, then execute it
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  if (req.method !== 'POST') {
    res.status(405).send({ success: false, errorMessage: 'Only POST requests allowed' })
    return;
  }

  const { workflowId } = JSON.parse(req.body);

  try {
  // get the workflow from the DB
  const workflow = await getWorkflow(workflowId).then(
    (workflow) => {
      return workflow;
    }
  ).catch((error) => {
    console.log("ERROR: ", error);
  })

  // execute the workflow
  if (workflow) {
      const actions = workflow!.actions;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: actions[0].value,
        temperature: 0.7,
        max_tokens: 250,
      });
        
      res.status(200).json({ success: true, response: response.data.choices.pop()!.text});
  } else {
    res.status(500).json({ success: false, errorMessage: `Workflow ${workflowId} not found`});
  }

    // let data = "";

  //   inputs.forEach(async (input: any) => {
  //     if (input.type === 'text') {
  //       const response = await openai.createCompletion({
  //         model: "text-davinci-003",
  //         prompt: input.value,
  //         temperature: 0.9,
  //         max_tokens: 150,
  //         top_p: 1,
  //         frequency_penalty: 0.0,
  //         presence_penalty: 0.6,
  //         // stop: [" Human:", " AI:"],
  //       });
  //       data = response.data.choices[0].text || "";
  // }})

  // res.status(200).json({ success: true, response: workflow?.actions});
    
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error});
  }

}
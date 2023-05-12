import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai';
import { getWorkflow } from '@/utils/db';


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

// TODO: add authentication (api keys)
// TODO: get request to DB to get workflow, then execute it
// action types: text, image, code, email, discord
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ success: false, errorMessage: 'Only POST requests allowed' })
    return;
  }

  const { workflowId, input } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  
  const workflow = await getWorkflow(workflowId).then(
    (workflow) => {
      return workflow;
    }
  ).catch((error) => {
    res.status(400).json({ success: false, errorMessage: error}) 
  });

  let output = input;
  for (const action of workflow!.actions) {
    switch (action.type) {
      case 'text':
        const textResponse = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `${output}\n${action.prompt}`,
          max_tokens: 2048,
          temperature: action.temperature || 0.5,
        });
        output = textResponse.data.choices[0].text?.trim();
        break;
      case 'image':
        const imageResponse = await openai.createImage({
          prompt: `${output}\n${action.prompt}`,
          size: '1024x1024'
        });
        output = imageResponse.data.data[0].url;
        break;
      case 'code':
        const codeResponse = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `You are a model trained to write code. Your response MUST be valid code based on the prompt that you have been given.\n${output}\n${action.prompt}.`,
          max_tokens: 1024,
          temperature: 0.5,
        });
        output = codeResponse.data.choices[0].text?.trim();
        break;
      case 'email':
        const emails = action.emails.split(',');
        await sendEmail(output, emails);
        break;
      case 'discord':
        await sendDiscordMessage(output, action.webhookUrl);
        break;
      default:
        throw new Error(`Invalid action type: ${action.type}`);
    }
  }

  res.status(200).json({ success: true, response: output });  

  async function sendEmail(output: string, emails: string[]) {
    // Implement email sending logic here
    
    console.log(output, emails);
  }
  
  async function sendDiscordMessage(output: string, webhookUrl: string) {
    // Implement Discord message sending logic here
    console.log(output, webhookUrl);
  }

}
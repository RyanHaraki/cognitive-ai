import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai';
import { getWorkflow, getAPIKeyFromKey } from '@/utils/db';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.NEXT_UPSTASH_REDIS_REST_TOKEN!,
    token: process.env.NEXT_UPSTASH_REDIS_REST_TOKEN!,
  })

// Rate Limiter
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "5 s"),
  });

// return value from executing a workflow
interface Data  {
  success: boolean;
  errorMessage?: string;
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
    console.log("STARTED")
  // const identifier = "api";
  // const result = await ratelimit.limit(identifier);
  // res.setHeader('X-RateLimit-Limit', result.limit)
  // res.setHeader('X-RateLimit-Remaining', result.remaining)
  console.log("RATE LIMITED")

  // if (!result.success) {
  //   res.status(429).send({ success: false, errorMessage: 'Too many requests, please wait before trying again' })
  //   return;
  // }

  if (req.method !== 'POST') {
    res.status(405).send({ success: false, errorMessage: 'Only POST requests allowed' })
    return;
  }

  const apiKey = req.headers['authorization'];
  
  // check if api key is valid
  if (apiKey === undefined) {
    res.status(401).json({ success: false, errorMessage: 'No API key provided' });
    return;
  } 
 
  const apiKeyData = await getAPIKeyFromKey(apiKey);
  if (apiKeyData.length === 0) {
      res.status(401).json({ success: false, errorMessage: 'Invalid API key' });
      return;
    } 

    if (apiKeyData[0].key !== apiKey) {
      res.status(401).json({ success: false, errorMessage: 'Invalid API key' });
      return;
    }
    
    console.log("CHECKS DONE")
  const { workflowId, input } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  
  // get workflow from DB
  const workflow = await getWorkflow(workflowId).then(
    (workflow) => {
      if (workflow === undefined) {
        res.status(400).json({ success: false, errorMessage: 'Workflow not found' })  
      }
      return workflow;
    }
  ).catch((error) => {
    res.status(400).json({ success: false, errorMessage: error}) 
  });
  console.log("GOT WORKFLOW")

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
          max_tokens: 25,
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
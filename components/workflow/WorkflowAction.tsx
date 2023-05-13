import React, { useEffect } from "react";
import { useState } from "react";

interface Props {
  id: string;
  type: string;
  prompt: string;
  emails?: string[];
  discordWebhookURL?: string;
  actions: any;
  setActions: any;
}

const WorkflowAction = ({
  id,
  type,
  prompt,
  actions,
  setActions,
  emails,
  discordWebhookURL,
}: Props) => {
  const [actionType, setActionType] = useState("text");
  const [actionPrompt, setActionPrompt] = useState("");
  const [emailRecipients, setEmailRecipients] = useState("");
  const [discordWebhook, setDiscordWebhook] = useState("");

  useEffect(() => {
    setActionType(type);
    setActionPrompt(prompt);
    setEmailRecipients(emails ? emails.join(",") : "");
    setDiscordWebhook(discordWebhookURL ? discordWebhookURL : "");
  }, []);

  const deleteAction = () => {
    const newActions = actions.filter((action: any) => action.action_id !== id);
    setActions(newActions);
  };

  // TODO: update action to use a payload instead of individual params
  const updateAction = (
    newActionType: string,
    newActionPrompt: string,
    newEmailRecipients: string,
    newDiscordWebhook: string
  ) => {
    const newActions = actions.map((action: any) => {
      if (action.action_id === id) {
        return {
          ...action,
          type: newActionType,
          prompt: newActionPrompt,
          emails: newEmailRecipients.split(","),
          discordWebhookURL: newDiscordWebhook,
        };
      } else {
        return action;
      }
    });
    setActions(newActions);
  };

  const renderActionDetails = () => {
    switch (actionType) {
      case "text":
        return (
          <div>
            <p>Text Rules</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the prompt to set the rules for the text generation
            </p>
          </div>
        );
      case "image":
        return (
          <div>
            <p>Image Rules</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the prompt to set rules for the image generation
            </p>
          </div>
        );
      // case "email":
      //   return (
      //     <div>
      //       <p>Email</p>
      //       <p className="text-gray-500 mb-2 text-sm">
      //         Enter the email address(es) you want to send the email to,
      //         separated by commas
      //       </p>
      //       <input
      //         type="text"
      //         className="w-full p-2 mb-4 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
      //         value={emailRecipients}
      //         placeholder="jane@doe.com, bob@website.com"
      //         onChange={(e) => {
      //           const newEmailRecipients = e.target.value;
      //           setEmailRecipients(newEmailRecipients);
      //           updateAction(
      //             actionType,
      //             actionPrompt,
      //             newEmailRecipients,
      //             discordWebhook
      //           );
      //         }}
      //       />
      //       <p>Email Prompt</p>
      //       <p className="text-gray-500 mb-2 text-sm">
      //         Enter the prompt you want to use to generate the email. It will
      //         automatically create a subject and header.
      //       </p>
      //     </div>
      //   );
      // case "discord":
      //   return (
      //     <div>
      //       <p>Discord Webhook URL</p>
      //       <p className="text-gray-500 mb-2 text-sm">
      //         Enter the Discord Webhook URL you want to send the message to
      //       </p>
      //       <input
      //         type="text"
      //         className="w-full p-2 mb-4 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
      //         value={emailRecipients}
      //         onChange={(e) => {
      //           const newDiscordWebhook = e.target.value;
      //           setDiscordWebhook(newDiscordWebhook);
      //           updateAction(
      //             actionType,
      //             actionPrompt,
      //             emailRecipients,
      //             newDiscordWebhook
      //           );
      //         }}
      //       />

      //       <p>Message Prompt</p>
      //       <p className="text-gray-500 mb-2 text-sm">
      //         Enter the prompt you want to use to generate the message.
      //       </p>
      //     </div>
      //   );
      case "code":
        return (
          <div>
            <p>Code Rules</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the prompt to set rules for the code generation
            </p>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 max-w-[600px] w-full">
      <div className="mb-4 border-b border-gray-200 border-solid">
        <h2 className="font-medium text-2xl">Action</h2>
        <p className="text-gray-500 mb-2 text-sm">Do this...</p>
      </div>
      <div className="flex w-full justify-between">
        <div>
          <p>Type</p>
          <p className="text-gray-500 mb-2 text-sm">
            Select the type of action you want to perform
          </p>
        </div>
        <div>
          <button
            onClick={deleteAction}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <select
        value={actionType}
        onChange={(e) => {
          const newActionType = e.target.value;
          setActionType(newActionType);
          updateAction(
            newActionType,
            actionPrompt,
            emailRecipients,
            discordWebhook
          );
        }}
        className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm mb-4"
      >
        <option value="text">Generate Text</option>
        <option value="image">Generate Image</option>
        {/* <option value="fine-tune">Fine-Tune Image</option> */}
        <option value="code">Generate Code</option>
        {/* <option value="email">Send Email</option> */}
        {/* <option value="discord">Send Discord Message</option> */}
        {/* <option value="slack">Send Slack Message</option> */}
      </select>
      {/* Render the action details here */}
      {renderActionDetails()}
      <textarea
        value={actionPrompt}
        onChange={(e) => {
          const newActionPrompt = e.target.value;
          setActionPrompt(newActionPrompt);
          updateAction(
            actionType,
            newActionPrompt,
            emailRecipients,
            discordWebhook
          );
        }}
        className="w-full h-24 p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
      ></textarea>
    </div>
  );
};

export default WorkflowAction;

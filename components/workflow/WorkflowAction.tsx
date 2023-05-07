import React from "react";
import { useState } from "react";

const WorkflowAction = () => {
  const [actionType, setActionType] = useState("text");
  const [textPrompt, setTextPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [emailPrompt, setEmailPrompt] = useState("");
  const [emailRecipients, setEmailRecipients] = useState("");
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [discordPrompt, setDiscordPrompt] = useState("");
  const [codePrompt, setCodePrompt] = useState("");

  const renderActionDetails = () => {
    switch (actionType) {
      case "text":
        return (
          <div>
            <p>Text Prompt</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the prompt you want to use to generate text
            </p>
            <textarea
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              className="w-full h-24 p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
            ></textarea>
          </div>
        );
      case "image":
        return (
          <div>
            <p>Image Prompt</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the prompt you want to use to generate the image
            </p>
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              className="w-full h-24 p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
            ></textarea>
          </div>
        );
      case "fine-tune":
        return <h1>comin soon</h1>;
      case "email":
        return (
          <div>
            <p>Email</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the email address(es) you want to send the email to,
              separated by commas
            </p>
            <input
              type="text"
              className="w-full p-2 mb-4 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
              value={emailRecipients}
              onChange={(e) => setEmailRecipients(e.target.value)}
            />

            <p>Email Prompt</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the prompt you want to use to generate the email. It will
              automatically create a subject and header.
            </p>
            <textarea
              value={emailPrompt}
              onChange={(e) => setEmailPrompt(e.target.value)}
              className="w-full h-24 p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
            ></textarea>
          </div>
        );
      case "discord":
        return (
          <div>
            <p>Discord Webhook URL</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the Discord Webhook URL you want to send the message to
            </p>
            <input
              value={discordWebhook}
              onChange={(e) => setDiscordWebhook(e.target.value)}
              type="text"
              className="w-full p-2 mb-4 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
              placeholder="https://discord.com/api/webhooks/..."
            />

            <p>Message Prompt</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the prompt you want to use to generate the message.
            </p>
            <textarea
              value={discordPrompt}
              onChange={(e) => setDiscordPrompt(e.target.value)}
              className="w-full h-24 p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
            ></textarea>
          </div>
        );
      case "code":
        return (
          <div>
            <p>Code Prompt</p>
            <p className="text-gray-500 mb-2 text-sm">
              Enter the prompt you want to use to generate the code.
            </p>
            <textarea
              value={codePrompt}
              onChange={(e) => setCodePrompt(e.target.value)}
              className="w-full h-24 p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
            ></textarea>
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
      <p>Type</p>
      <p className="text-gray-500 mb-2 text-sm">
        Select the type of action you want to perform
      </p>
      <select
        onChange={(e) => {
          setActionType(e.target.value);
          console.log(actionType);
        }}
        className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm mb-4"
      >
        <option value="text">Generate Text</option>
        <option value="image">Generate Image</option>
        {/* <option value="fine-tune">Fine-Tune Image</option> */}
        <option value="code">Generate Code</option>
        <option value="email">Send Email</option>
        <option value="discord">Send Discord Message</option>
        {/* <option value="slack">Send Slack Message</option> */}
      </select>
      {renderActionDetails()}
    </div>
  );
};

export default WorkflowAction;

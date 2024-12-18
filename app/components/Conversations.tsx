"use client";
import { useChat } from "ai/react";
import { Message } from "ai/react";
import { MessageSquare, MessagesSquare } from "lucide-react";
import ChatInput from "./ChatInput";
import Messages from "../components/Messages";

const page = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleSubmit, handleInputChange, input, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
    });
  return (
    <>
      <div className="relative min-h-full  flex divide-y flex-col justify-between gap-2 ">
        <div className="flex-1 justify-between flex flex-col text-white">
          <Messages messages={messages} />
        </div>
        <ChatInput
          input={input}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          setInput={setInput}
        />
      </div>
    </>
  );
};

export default page;

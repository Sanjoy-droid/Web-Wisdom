"use client";
import { useChat } from "ai/react";
import { MessageSquare, MessagesSquare } from "lucide-react";
import Messages from "../components/Messages";

const page = ({ sessionId }: { sessionId: string }) => {
  const { messages, handleSubmit, handleInputChange, input } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
  });
  return (
    <>
      <div className="relative min-h-full  flex divide-y flex-col justify-between gap-2">
        <div className="flex-1 justify-between flex flex-col text-white">
          <Messages messages={messages} />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="text-black"
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default page;

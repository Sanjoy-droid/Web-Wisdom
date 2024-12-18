"use client";
import React, { useEffect, useRef } from "react";
import { type Message as TMessage } from "ai/react";
import Message from "./Message";
import { MessageSquare } from "lucide-react";

type MessagesProps = {
  messages: TMessage[];
};

const Page = ({ messages }: MessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="absolute top-0 h-screen  w-screen  bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] ">
      <div className="flex max-h-screen pb-48 flex-1 flex-col overflow-y-auto">
        {messages.length ? (
          messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              isUserMessage={message.role === "user"}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <MessageSquare className="size-8 text-blue-500" />
            <h3 className="font-semibold text-2xl">You are Good to Go</h3>
            <p className="text-sm text-zinc-500">Drop Your Prompt</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Page;

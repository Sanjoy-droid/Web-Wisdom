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
          <div
            className="flex-1 flex flex-col items-center justify-center gap-2
bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-[24rem] text-center px-6"
          >
            {/* Animated Logo Section */}
            <div className="flex items-center justify-center bg-blue-100 dark:bg-indigo-800 rounded-full w-20 h-20 shadow-lg animate-bounce">
              <MessageSquare className="w-10 h-10 text-blue-600 dark:text-indigo-300" />
            </div>

            {/* Title Section */}
            <h1 className="text-5xl font-extrabold text-indigo-800 dark:text-indigo-300 tracking-tight">
              Welcome to Web Wisdom
            </h1>

            {/* Subtitle Section */}
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              Harness the power of AI and{" "}
              <a
                className=" hover:border-b text-blue-600"
                href="https://github.com/upstash/rag-chat"
              >
                {" "}
                RAG-Chat
              </a>{" "}
              to explore knowledge, solve problems, and gain insights. Let Web
              Wisdom be your guide to smarter conversations.
            </p>

            {/* Call-to-Action Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center"></div>

            {/* Footer Section */}
            <footer className="absolute bottom-6 text-sm text-gray-500 dark:text-gray-400">
              <p>
                Built with{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  RAG-Chat
                </span>
              </p>
            </footer>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Page;

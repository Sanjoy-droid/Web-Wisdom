"use client";
import React, { useState } from "react";

import { BotMessageSquare, User } from "lucide-react";

type MessageProps = {
  content: string;
  isUserMessage: boolean;
};

const Message = ({ content, isUserMessage }: MessageProps) => {
  const [promptTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
  return (
    <div
      className={`
      py-5 px-4 
      border-b border-neutral-200 dark:border-neutral-700
      transition-colors duration-300
    `}
    >
      <div className="max-w-4xl mx-auto flex items-start space-x-4">
        {/* Avatar Container */}
        <div
          className={`
          w-12 h-12 rounded-full flex items-center justify-center
          ${
            isUserMessage
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
              : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
          }
          shadow-sm dark:shadow-none
        `}
        >
          {isUserMessage ? (
            <User className="w-6 h-6" strokeWidth={1.5} />
          ) : (
            <BotMessageSquare className="w-6 h-6" strokeWidth={1.5} />
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span
              className={`
              text-sm font-semibold mr-3
              ${
                isUserMessage
                  ? "text-blue-800 dark:text-blue-300"
                  : "text-indigo-800 dark:text-indigo-300"
              }
            `}
            >
              {isUserMessage ? "You" : "AI "}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {promptTime}
            </span>
          </div>

          <div
            className={`
            p-4 rounded-2xl text-sm 
            ${
              isUserMessage
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800/50"
                : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100 border border-indigo-200 dark:border-indigo-800/50"
            }
            max-w-[90%]
            shadow-xs dark:shadow-none
            transition-colors duration-300
          `}
          >
            <p className="leading-relaxed text-medium">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

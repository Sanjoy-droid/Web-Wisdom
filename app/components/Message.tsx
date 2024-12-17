import React from "react";
import { Send, Bot, User } from "lucide-react";

type MessageProps = {
  content: string;
  isUserMessage: boolean;
};
const page = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div className=" text-white">
      <div className="p-6">
        <div className="max-w-3xl mx-auto flex items-start gap-2.5">
          <div className="size-10 shrinks-0 aspect-square rounded-full border  flex justify-center items-center">
            {isUserMessage ? (
              <User className="size-5" />
            ) : (
              <Bot className="size-5 text-white" />
            )}
          </div>
          <div className="flex flex-col ml-6 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold ">
                {isUserMessage ? "You" : "AI"}
              </span>
              <p className="text-sm font-normal py-2.5 ">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

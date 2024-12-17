import React from "react";
import { Send, Paperclip } from "lucide-react";
import { Textarea } from "@nextui-org/react";
import { type useChat } from "ai/react";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];

type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];

type SetInput = ReturnType<typeof useChat>["setInput"];

type ChatInputProps = {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
};

const ChatInput = ({
  handleInputChange,
  handleSubmit,
  setInput,
  input,
}: ChatInputProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full py-4 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto relative">
        <div className="relative group shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="relative"></form>
          <Textarea
            placeholder="Send a message"
            onChange={handleInputChange}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
                setInput("");
              }
            }}
            className="
              w-full 
              pl-10 
              pr-16 
              py-3 
              text-md 
            text-black
              border 
              border-gray-200 
              dark:border-gray-700 
              rounded-2xl 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500/30 
              resize-none 
              max-h-40 
              min-h-[52px] 
              overflow-auto 
              transition-all 
              duration-300 
              ease-in-out
            "
          />

          <button
            className="
              absolute 
              bottom-4 
              right-2 
              p-2 
              bg-indigo-500 
              dark:bg-indigo-600 
              text-white 
              rounded-full 
              opacity-0 
              group-hover:opacity-100 
              group-focus-within:opacity-100 
              transition-all 
              duration-300 
              hover:bg-green-600 
              dark:hover:bg-green-700 
              disabled:opacity-50 
              disabled:cursor-not-allowed
            "
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-600 text-center mt-1.5 flex justify-center items-center space-x-2"></div>
      </div>
    </div>
  );
};

export default ChatInput;

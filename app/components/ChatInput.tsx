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
    <div className="fixed bottom-0 left-0 w-full py-4 px-6 bg-indigo-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto relative">
        <div className="relative group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="relative"
          >
            <textarea
              placeholder="Send a message..."
              onChange={handleInputChange}
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                  setInput(""); // Clear input after submitting
                }
              }}
              className="
            w-full
            pl-5
            pr-16
            py-3
            text-medium
            text-indigo-900 dark:text-indigo-100
            border border-indigo-200 dark:border-indigo-800/50
            bg-indigo-50 dark:bg-indigo-950
            rounded-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-300 dark:focus:ring-indigo-500
            resize-none
            max-h-40
            min-h-[52px]
            overflow-auto
            transition-all
            duration-300
            shadow-sm
          "
            />
            <button
              type="submit"
              className="
            absolute 
            bottom-5 
            right-4 
            p-3 
            bg-indigo-500 
            dark:bg-indigo-600 
            text-white 
            rounded-full 
            shadow-md 
            opacity-90 
            hover:opacity-100 
            hover:bg-indigo-600 
            dark:hover:bg-indigo-700 
            transition-all 
            duration-300 
            disabled:opacity-50 
            disabled:cursor-not-allowed
          "
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

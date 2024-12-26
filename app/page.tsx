"use client";
import { useState } from "react";
import { ClipboardCopy } from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://web-wisdom-taupe.vercel.app/");
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 sm:p-8">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl top-0 right-0 animate-pulse" />
      </div>

      <main className="w-full max-w-3xl space-y-8 z-10">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-center">
          Web Wisdom AI
        </h1>

        {/* URL Input Section */}
        <div className="relative group ">
          <div className="flex items-center ml-36 gap-2 p-3 rounded-lg bg-gray-800/50 backdrop-blur border border-gray-700/50 transition-all duration-300 hover:border-gray-600/50  w-[30rem] ">
            <div className="flex-1 px-3 font-mono text-sm  text-blue-400 ">
              https://web-wisdom-taupe.vercel.app/
            </div>
            <p className="text-xs flex justify-center items-center text-center h-8 w-12 ">
              {copied ? "Copied!" : ""}
            </p>
            <button
              onClick={handleCopy}
              className={`p-2 rounded-md hover:bg-gray-700/50  text-gray-400"
              }`}
            >
              <ClipboardCopy
                className={`w-5 h-5 ${copied ? "rotate-12 text-green-400" : ""} transition-colors  duration-100`}
              />
            </button>
          </div>
          <p className="mt-8 text-xl text-gray-400 text-center font-light tracking-wide max-w-2xl mx-auto leading-relaxed animate-[fadeIn_0.5s_ease-out]">
            Paste the Link before any website URL to start chatting with that
            website
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-500 text-sm">
        Built with Upstash, Rag-Chat, Next.js, Typescript & Tailwind
      </footer>
    </div>
  );
}

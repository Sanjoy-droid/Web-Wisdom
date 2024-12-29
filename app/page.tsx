"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Loader2, Loader } from "lucide-react";

export default function Home() {
  const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000/";

  const [site, setSite] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const navigate = (url: string) => {
    router.push(url); // Navigates within the Next.js app
  };

  const handleChat = async () => {
    if (site) {
      setIsLoading(true);
      try {
        await navigate(`${URL}${site}`);
      } catch (error) {
        console.error("Navigation error:", error);
        setIsLoading(false);
        alert("An error occurred while navigating. Please try again.");
      }
    } else {
      alert("Please paste a valid context URL.");
    }
  };

  return (
    <>
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
              <input
                value={site}
                onChange={(e) => setSite(e.target.value)}
                placeholder="Paste Your Context URL"
                className="flex-1 px-3 font-mono text-sm outline-none bg-transparent text-blue-400 placeholder:select-none"
              />

              <button
                onClick={handleChat}
                className={`p-2 rounded-md hover:bg-gray-700/50  text-gray-400"
              }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                ) : (
                  <Terminal className="w-5 h-5 text-green-400 transition-colors duration-100" />
                )}
              </button>
            </div>
            <p className="mt-8 text-xl text-gray-400 text-center font-light tracking-wide max-w-2xl mx-auto leading-relaxed animate-[fadeIn_0.5s_ease-out]">
              Paste of URL any Website and start Asking Questions
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="absolute bottom-4 text-gray-500 text-sm">
          Built with Next.js, Typescript, Upstash, Redis, Rag-Chat & Tailwind
        </footer>
      </div>
    </>
  );
}

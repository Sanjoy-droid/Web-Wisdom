"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Loader2 } from "lucide-react";
import Footer from "./components/Footer";

export default function Home() {
  const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000/";
  const [site, setSite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChat = async () => {
    if (!site) {
      alert("Please paste a valid Website URL for Context!!!");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => {
        router.push(`${URL}${site}`);
        setTimeout(resolve, 1500);
      });
    } catch (error) {
      console.error("Navigation error:", error);
      alert("An error occurred while navigating. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleChat();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500/65 via-gray-800/15 to-black text-white">

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl top-0 right-0 animate-pulse" />
      </div>

      {/* Main content wrapper with padding for footer */}
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8 z-10 px-4 sm:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300 text-center">
              Web Wisdom AI
            </h1>
            <div className="relative group w-full flex justify-center">
              <div className="flex items-center w-full sm:w-[30rem] gap-2 p-2 sm:p-3 rounded-lg bg-gray-800/50 backdrop-blur border border-gray-700/50 transition-all duration-300 hover:border-indigo-300/50 focus-within:border-indigo-300/50">
                <input
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste Your Context URL"
                  className="flex-1 px-2 sm:px-3 font-mono text-xs sm:text-medium outline-none bg-transparent text-blue-400 placeholder:text-gray-500 placeholder:select-none w-full"
                  disabled={isLoading}
                />
                <button
                  onClick={handleChat}
                  disabled={isLoading}
                  className="p-1.5 sm:p-2 rounded-md hover:bg-gray-700/50 text-gray-400 flex-shrink-0 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 animate-spin" />
                  ) : (
                    <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 transition-colors duration-100" />
                  )}
                </button>
              </div>
            </div>
            <p className="text-base sm:text-xl text-gray-100 text-center font-light tracking-wide max-w-2xl mx-auto leading-relaxed animate-[fadeIn_0.5s_ease-out] px-4 ">
              Paste of URL any Website and start Asking Questions
            </p>
            <p className="w-full text-center pb-16 text-gray-300 text-xs sm:text-sm ">
              Built with Next.js, Typescript, Upstash, Redis, Rag-Chat & Tailwind
            </p>
          </div>

        </main>


        {/* Tech stack footer */}
        <footer className="w-full">
          <Footer />
        </footer>

      </div>
    </div>
  );


}

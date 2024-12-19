import { redis } from "@/lib/redis";
import { ragChat } from "@/lib/rag-chat";
import Conversations from "../components/Conversations";
import { cookies } from "next/headers";
import React from "react";

type PageProps = {
  params: Promise<{
    url: string[];
  }>;
};

const fixURL = (url: string[]) => {
  return url.map((component) => decodeURIComponent(component)).join("/");
};

async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  const sessionCookies = await cookies();
  const sessionCookie = sessionCookies.get("sessionId")?.value;

  const fixedUrl = fixURL(resolvedParams.url);
  const sessionId = (fixedUrl + sessionCookie)?.replace(/\//g, "_");

  const isIndexed = await redis.sismember("already-indexed", fixedUrl);
  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  if (!isIndexed) {
    await ragChat.context.add({
      type: "html",
      source: fixedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("already-indexed", fixedUrl);
  }

  return (
    <>
      <Conversations sessionId={sessionId} initialMessages={initialMessages} />
    </>
  );
}

export default Page;

//
// import { redis } from "@/lib/redis";
// import { ragChat } from "@/lib/rag-chat";
// import Conversations from "../components/Conversations";
// import { cookies } from "next/headers";
// import React from "react";
//
// type PageProps = {
//   params: Promise<{
//     url: string[];
//   }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// };
//
// // Helper function to decode and join URL components
// const fixURL = (url: string[]) => {
//   return url.map((component) => decodeURIComponent(component)).join("/");
// };
//
// async function Page({ params, searchParams }: PageProps) {
//   const [resolvedParams, resolvedSearchParams] = await Promise.all([
//     params,
//     searchParams,
//   ]);
//
//   // Early return if url parameter is missing
//   if (!resolvedParams.url || resolvedParams.url.length === 0) {
//     return <div>Invalid URL</div>;
//   }
//
//   const sessionCookies = await cookies();
//   const sessionCookie = sessionCookies.get("sessionId")?.value;
//
//   // Decode the dynamic URL from params
//   const fixedUrl = fixURL(resolvedParams.url);
//
//   // Create the session ID
//   const sessionId = (fixedUrl + (sessionCookie || "")).replace(/\//g, "_");
//
//   // Check if the URL is indexed in Redis
//   const isIndexed = await redis.sismember("already-indexed", fixedUrl);
//
//   // Fetch initial messages for the session
//   const initialMessages = await ragChat.history.getMessages({
//     amount: 10,
//     sessionId,
//   });
//
//   // If the URL is not indexed, index it and store it in Redis
//   if (!isIndexed) {
//     await ragChat.context.add({
//       type: "html",
//       source: fixedUrl,
//       config: {
//         chunkOverlap: 50,
//         chunkSize: 200,
//       },
//     });
//     await redis.sadd("already-indexed", fixedUrl);
//   }
//
//   return (
//     <>
//       <Conversations sessionId={sessionId} initialMessages={initialMessages} />
//     </>
//   );
// }
//
// export default Page;

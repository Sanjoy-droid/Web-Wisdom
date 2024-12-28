import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import React from "react";
import Conversations from "../components/Conversations";

type PageProps = {
  params: Promise<{
    url: string[];
  }>;
};
const fixUrl = (url: string[]) => {
  return url.map((element) => decodeURIComponent(element)).join("/");
};

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;

  const fixedUrl = fixUrl(resolvedParams.url);

  const sessionCookies = await cookies();
  const sessionCookie = sessionCookies.get("sessionId")?.value;
  const sessionId = (fixedUrl + sessionCookie)?.replace(/\//g, "_");

  const isIndexed = await redis.sismember("already-indexed", sessionId);

  if (!isIndexed) {
    try {
      await ragChat.context.add({
        type: "html",
        source: fixedUrl,
        config: { chunkOverlap: 20, chunkSize: 500 },
      });
    } catch (error) {
      console.error("Failed to add context to RAGChat:", error);
      throw new Error("Context addition failed");
    }

    await redis.pipeline().sadd("already-indexed", sessionId).exec();
    // await redis.sadd("already-indexed", sessionId);
  }

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return (
    <>
      <Conversations initialMessages={initialMessages} sessionId={sessionId} />
    </>
  );
};

export default page;

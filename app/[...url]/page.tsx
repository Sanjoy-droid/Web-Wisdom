import { redis } from "@/lib/redis";
import { ragChat } from "@/lib/rag-chat";
import Conversations from "../components/Conversations";
import { cookies } from "next/headers";

import React from "react";

type PageProps = {
  params: {
    url: string | string[] | undefined;
  };
};

const fixURL = ({ url }: { url: string[] }) => {
  const decodedURL = url.map((component) => decodeURIComponent(component));

  return decodedURL.join("/");
};

const page = async ({ params }: PageProps) => {
  const sessionCookies = await cookies();
  const sessionCookie = sessionCookies.get("sessionId")?.value;

  const fixedUrl = fixURL({ url: params.url as string[] });

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

    redis.sadd("already-indexed", fixedUrl);
  }

  return (
    <>
      <Conversations sessionId={sessionId} />
    </>
  );
};

export default page;

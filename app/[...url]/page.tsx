import { redis } from "@/lib/redis";
import { ragChat } from "@/lib/rag-chat";
import Conversations from "../components/Conversations";
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
  const fixedUrl = fixURL({ url: params.url as string[] });
  const isIndexed = await redis.sismember("already-indexed", fixedUrl);

  if (!isIndexed) {
    await ragChat.context.add({
      type: "html",
      source: fixedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    redis.sadd("already-indexed", fixedUrl);
  }

  const sesionId = "demo session";

  return (
    <>
      <p>I am URL </p>
      <Conversations sessionId={sesionId} />
    </>
  );
};

export default page;

import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const res = NextResponse.next();

  const cookie = req.cookies.get("sessionId");

  if (!cookie) {
    res.cookies.set("sessionId", crypto.randomUUID());
  }

  return res;
};

export default middleware;

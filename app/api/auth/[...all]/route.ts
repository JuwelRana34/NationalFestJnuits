import { createAuth } from "@/core/auth/auth";

// per-request auth instance
export async function GET(req: Request) {
  return createAuth().handler(req);
}
export async function POST(req: Request) {
  return createAuth().handler(req);
}

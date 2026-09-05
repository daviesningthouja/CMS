import { cookies } from "next/headers";

import { api } from "@/utils/api";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not defined");
}

export async function serverApiGet<T>(
  endpoint: string
): Promise<T> {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    "cafe_auth_token"
  )?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return api.get<T>(
    `${BACKEND_API_URL}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
}
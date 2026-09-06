import { cookies } from "next/headers";

import { api } from "@/utils/api";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not defined");
}

async function authenticatedRequest<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  data?: unknown
): Promise<T> {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    "cafe_auth_token"
  )?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  switch (method) {
    case "GET":
      return api.get<T>(
        `${BACKEND_API_URL}${endpoint}`,
        {
          headers,
          cache: "no-store",
        }
      );

    case "POST":
      return api.post<T>(
        `${BACKEND_API_URL}${endpoint}`,
        data,
        {
          headers,
          cache: "no-store",
        }
      );

    case "PUT":
      return api.put<T>(
        `${BACKEND_API_URL}${endpoint}`,
        data,
        {
          headers,
          cache: "no-store",
        }
      );

    case "PATCH":
      return api.patch<T>(
        `${BACKEND_API_URL}${endpoint}`,
        data,
        {
          headers,
          cache: "no-store",
        }
      );

    case "DELETE":
      return api.delete<T>(
        `${BACKEND_API_URL}${endpoint}`,
        data,
        {
          headers,
          cache: "no-store",
        }
      );
  }
}

export const serverApi = {
  get: <T>(endpoint: string) =>
    authenticatedRequest<T>("GET", endpoint),

  post: <T>(endpoint: string, data?: unknown) =>
    authenticatedRequest<T>("POST", endpoint, data),

  put: <T>(endpoint: string, data?: unknown) =>
    authenticatedRequest<T>("PUT", endpoint, data),

  patch: <T>(endpoint: string, data?: unknown) =>
    authenticatedRequest<T>("PATCH", endpoint, data),

  delete: <T>(endpoint: string, data?: unknown) =>
    authenticatedRequest<T>("DELETE", endpoint, data),
};
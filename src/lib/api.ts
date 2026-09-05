import type {
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

import { api } from "@/utils/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined"
  );
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  return api.post<LoginResponse>(
    `${API_URL}/api/login`,
    data
  );
}
"use server";

import { cookies } from "next/headers";
import { api } from "@/utils/api";
import type {
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not defined");
}

// 1. Static variable for cookie expiration (7 days in seconds)
// You can easily change this single variable to adjust both cookies.
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; 

export async function loginAction(
  data: LoginRequest
): Promise<LoginResponse> {
  const result = await api.post<LoginResponse>(
    `${BACKEND_API_URL}/api/login`,
    data
  );

  const cookieStore = await cookies();

  // Store JWT
  cookieStore.set(
    "cafe_auth_token",
    result.data.jwt,
    {
      httpOnly: true,
      // Fixed: secure should be true in "production", not "development"
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE, 
    }
  );

  // Store user information
  cookieStore.set(
    "cafe_user",
    JSON.stringify({
      id: result.data.id,
      full_name: result.data.full_name,
      email: result.data.email,
      role: result.data.role,
    }),
    {
      // Note: If you want to read this in your client components, 
      // you need to change httpOnly to false!
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    }
  );

  return result;
}

// 2. The new logout action
export async function logoutAction() {
  const cookieStore = await cookies();
  
  // Next.js provides a built-in delete method that instantly expires the cookies
  cookieStore.delete("cafe_auth_token");
  cookieStore.delete("cafe_user");
  
  return { success: true, message: "Logged out successfully" };
}

export async function changePassword(
  data: {
    email: string;
    current_password: string;
    new_password: string;
  }
) {
  return api.post(
    `${BACKEND_API_URL}/api/ChangePassword`,
    data
  );
}
import type {
  LoginRequest,
  loginResponse_v1,
} from "@/types/auth";
import {api} from "@/utils/api"


const API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL || process.env.API_URL_NETWORK;

console.log(API_URL)

if(!API_URL){
  throw new Error("API_URL_LOCAL is not defined in the environment variables.");
}

export async function login(
  data: LoginRequest
): Promise<loginResponse_v1>{
  return await api.post(`${API_URL}/api/login`,data);
}


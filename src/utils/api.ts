/* eslint-disable @typescript-eslint/no-explicit-any */

async function customFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: any
): Promise<T> {
  
  // Setup standard configurations
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || `Request failed with status ${response.status}`);
  }

  return result;
}

export const api = {
  get: <T>(url: string) => 
    customFetch<T>(url, "GET"),
    
  post: <T>(url: string, data: any) => 
    customFetch<T>(url, "POST", data),
    
  put: <T>(url: string, data: any) => 
    customFetch<T>(url, "PUT", data),
    
  patch: <T>(url: string, data: any) => 
    customFetch<T>(url, "PATCH", data),
    
  delete: <T>(url: string, data?: any) => 
    customFetch<T>(url, "DELETE", data),
};
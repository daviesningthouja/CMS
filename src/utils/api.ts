type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

interface FetchOptions {
  data?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
}

async function customFetch<T>(
  url: string,
  method: HttpMethod,
  options: FetchOptions = {}
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: options.cache,
  };

  if (
    options.data !== undefined &&
    method !== "GET"
  ) {
    config.body = JSON.stringify(options.data);
  }

  const response = await fetch(url, config);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        `Request failed with status ${response.status}`
    );
  }

  return result;
}
export const api = {
  get: <T>(
    url: string,
    options?: Omit<FetchOptions, "data">
  ) =>
    customFetch<T>(
      url,
      "GET",
      options
    ),

  post: <T>(
    url: string,
    data?: unknown,
    options?: Omit<FetchOptions, "data">
  ) =>
    customFetch<T>(
      url,
      "POST",
      {
        ...options,
        data,
      }
    ),

  put: <T>(
    url: string,
    data?: unknown,
    options?: Omit<FetchOptions, "data">
  ) =>
    customFetch<T>(
      url,
      "PUT",
      {
        ...options,
        data,
      }
    ),

  patch: <T>(
    url: string,
    data?: unknown,
    options?: Omit<FetchOptions, "data">
  ) =>
    customFetch<T>(
      url,
      "PATCH",
      {
        ...options,
        data,
      }
    ),

  delete: <T>(
    url: string,
    data?: unknown,
    options?: Omit<FetchOptions, "data">
  ) =>
    customFetch<T>(
      url,
      "DELETE",
      {
        ...options,
        data,
      }
    ),
};
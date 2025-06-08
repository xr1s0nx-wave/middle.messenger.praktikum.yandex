type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions<T = unknown> {
  method?: HTTPMethod;
  data?: T;
  headers?: Record<string, string>;
  timeout?: number;
}

function queryStringify<T extends Record<string, unknown>>(data: T): string {
  return (
    "?" +
    Object.entries(data)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
      )
      .join("&")
  );
}

export class HTTPTransport {
  get<T = unknown>(url: string, options: RequestOptions<T> = {}) {
    return this.request<T>(url, { ...options, method: "GET" });
  }
  post<T = unknown>(url: string, options: RequestOptions<T> = {}) {
    return this.request<T>(url, { ...options, method: "POST" });
  }
  put<T = unknown>(url: string, options: RequestOptions<T> = {}) {
    return this.request<T>(url, { ...options, method: "PUT" });
  }
  delete<T = unknown>(url: string, options: RequestOptions<T> = {}) {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
  request<T = unknown>(url: string, options: RequestOptions<T>): Promise<XMLHttpRequest> {
    const { method = "GET", data, headers = {}, timeout = 5000 } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let requestUrl = url;
      if (method === "GET" && data && typeof data === "object") {
        requestUrl += queryStringify(data as Record<string, unknown>);
      }
      xhr.open(method, requestUrl);
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });
      xhr.timeout = timeout;
      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);
      xhr.ontimeout = () => reject(xhr);
      if (method === "GET" || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

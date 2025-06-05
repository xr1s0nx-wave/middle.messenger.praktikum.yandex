type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HTTPMethod;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

function queryStringify(data: Record<string, any>): string {
  return (
    "?" +
    Object.entries(data)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&")
  );
}

export class HTTPTransport {
  get(url: string, options: RequestOptions = {}) {
    return this.request(url, { ...options, method: "GET" });
  }
  post(url: string, options: RequestOptions = {}) {
    return this.request(url, { ...options, method: "POST" });
  }
  put(url: string, options: RequestOptions = {}) {
    return this.request(url, { ...options, method: "PUT" });
  }
  delete(url: string, options: RequestOptions = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }
  request(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
    const { method = "GET", data, headers = {}, timeout = 5000 } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let requestUrl = url;
      if (method === "GET" && data) {
        requestUrl += queryStringify(data);
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
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

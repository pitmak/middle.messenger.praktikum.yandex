const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data: object | undefined): string {
  let result = '';
  if (data) {
    result = Object.entries(data)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
  }
  return result === '' ? '' : `?${result}`;
}

interface HTTPOptions {
  method?: string;
  data?: Document;
  headers?: object;
  timeout?: number;
}

export default class HTTPTransport {
  public get(url: string, options: HTTPOptions = {}) {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  }

  public put(url: string, options: HTTPOptions = {}) {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  public post(url: string, options: HTTPOptions = {}) {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  public delete(url: string, options: HTTPOptions = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  // eslint-disable-next-line class-methods-use-this
  private request(url: string, options: HTTPOptions, timeout = 5000) {
    const { method = METHODS.GET, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let reqUrl = url;
      if (method === METHODS.GET) {
        reqUrl = url + queryStringify(data);
      }
      xhr.open(method, reqUrl);
      xhr.timeout = timeout;

      if (headers) {
        Object.entries(headers).forEach(([key, val]) => xhr.setRequestHeader(key, val));
      }

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

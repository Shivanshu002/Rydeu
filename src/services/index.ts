
export const BASE_URL = API_URL;
const TIMEOUT_MS = 300_000;


const buildHeaders = () => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
};

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
    Promise.race([
        promise,
        new Promise<never>((_, reject) =>
            setTimeout(() => reject({ status: 504 }), ms)
        ),
    ]);

const parseResponse = async (res: Response) => {
    if (res.status === 401) redirectToLogin();

    const isJson = res.headers
        .get("content-type")
        ?.includes("application/json");

    const data = isJson ? await res.json() : await res.text();
    if (res.ok) return { status: res.status, ...data };
    return Promise.reject({ status: res.status, ...data });
};


const request = (
    url: string,
    options: RequestInit = {},
    urlPrefix = BASE_URL
) =>
    withTimeout(fetch(urlPrefix + url, options), TIMEOUT_MS).then(res =>
        parseResponse(res as Response)
    );

export const doGet = (url) =>
    request(url, { method: "GET", headers: buildHeaders(headers) });

export const doPost = (url, body) =>
    request(url, {
        method: "POST",
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
    });

export const doPut = (url: string, body?: unknown, headers: HeadersInit = {}) =>
    request(url, {
        method: "PUT",
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
    });

export const doPatch = (url: string, body?: unknown, headers: HeadersInit = {}) =>
    request(url, {
        method: "PATCH",
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
    });

export const doDelete = (url: string, body?: unknown, headers: HeadersInit = {}) =>
    request(url, {
        method: "DELETE",
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
    });



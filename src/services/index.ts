import API_URL from "./config";

// export const BASE_URL = API_URL;
export const BASE_URL = "https://dummyjson.com/auth/";
const TIMEOUT_MS = 300_000;

const buildHeaders = (extraHeaders = {}) => {
    return {
        "Content-Type": "application/json",
        ...extraHeaders,
    };
};

const withTimeout = (promise, ms) =>
    Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject({ status: 504 }), ms)
        ),
    ]);

const parseResponse = async (res) => {
    if (res.status === 401) {
    }
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();
    if (res.ok) {
        return { status: res.status, ...data };
    }
    return Promise.reject({ status: res.status, ...data });
};

const request = (url, options = {}, urlPrefix = BASE_URL) =>
    withTimeout(fetch(urlPrefix + url, options), TIMEOUT_MS).then(res =>
        parseResponse(res)
    );

export const doGet = (url, headers = {}) =>
    request(url, {
        method: "GET",
        headers: buildHeaders(headers),
    });

export const doPost = (url, body, headers = {}) =>
    request(url, {
        method: "POST",
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
    });

export const doPut = (url, body, headers = {}) =>
    request(url, {
        method: "PUT",
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
    });

export const doPatch = (url, body, headers = {}) =>
    request(url, {
        method: "PATCH",
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
    });

export const doDelete = (url, body, headers = {}) =>
    request(url, {
        method: "DELETE",
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
    });

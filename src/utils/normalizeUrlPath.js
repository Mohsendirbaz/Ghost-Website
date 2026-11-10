export function normalizeUrlPath(path) {
    const baseUrl = new URL(document.baseURI);
    const url = new URL(path, baseUrl);

    return url.origin === baseUrl.origin
        ? `${url.pathname}${url.search}${url.hash}`
        : url.href;
}

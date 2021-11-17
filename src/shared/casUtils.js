export function buildCasLoginUrl(baseUrl, service) {
    const servieBase64 = encodeURI(service);
    return baseUrl + "/cas/login?service=" + servieBase64;
}
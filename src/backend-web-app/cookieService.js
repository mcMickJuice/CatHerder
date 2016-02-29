export function setCookie(res, name, value) {
    //sign this?
    const oneWeekInMs = 604800000;
    res.cookie(name, value, {maxAge: oneWeekInMs, signed: true, secure: true});
}

export function getCookie(req, name) {
    const cookie = res.cookies[name];

    return cookie;
}
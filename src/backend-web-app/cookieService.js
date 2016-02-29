export function setCookie(res, name, value) {
    //sign this?
    const oneWeekInMs = 604800000;
    //TODO encrypt cookie
    res.cookie(name, value, {maxAge: oneWeekInMs, signed: true});
}

export function getCookie(req, name) {
    const cookie = req.signedCookies[name];

    return cookie;
}
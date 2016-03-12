import Cookies from 'cookies-js';

function setLocalStorage(key, obj) {
  const jsonString = JSON.stringify(obj);
  localStorage.setItem(key, jsonString);
}

function getLocalStorage(key) {
  const item = localStorage.getItem(key);

  if (!item) return null;

  return JSON.parse(item);
}

function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

const _localStorage = {
  get: getLocalStorage,
  set: setLocalStorage,
  remove: removeLocalStorage,
};

function setCookie(key, obj) {
  const objString = JSON.stringify(obj);
  Cookies.set(key, objString);
}

function getCookie(key) {
  const cookie = Cookies.get(key);

  if (!cookie) return null;

  return JSON.parse(cookie);
}

function removeCookie(key) {
  Cookies.expire(key);
}


const _cookieStorage = {
  get: getCookie,
  set: setCookie,
  remove: removeCookie,
};

let hasCheckedLocalStorage = false;
function checkCanUseLocalStorage() {
  if (!localStorage) {
    return false;
  }

  try {
    const value = '__LOCALSTORAGECHECK__';
    localStorage.setItem(value, value);
    const result = localStorage.getItem(value);
    return result === value;
  } catch (e) {
    return false;
  }
}

let storageService;
if (!hasCheckedLocalStorage) {
  hasCheckedLocalStorage = true;
  const canUseLocalStorage = checkCanUseLocalStorage();

  storageService = canUseLocalStorage ?
    _localStorage :
    _cookieStorage;
}

export function set(key, obj) {
  storageService.set(key, obj);
}

export function get(key) {
  storageService.get(key);
}
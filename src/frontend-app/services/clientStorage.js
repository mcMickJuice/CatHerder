import { get, set } from './storageFacade';

const CATHERDER_USERINFO_KEY = 'CATHERDER_USERINFO';
export function getStoredUser() {
  return get(CATHERDER_USERINFO_KEY);
}

export function setLoggedInUser(username, imageUrl, fullName) {
  const userObj = {
    username,
    imageUrl,
    fullName,
  };

  set(CATHERDER_USERINFO_KEY, userObj);
}
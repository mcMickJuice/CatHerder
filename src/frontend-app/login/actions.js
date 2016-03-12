import { login as _login } from '../services/authenticationService';
import { setLoggedInUser } from '../services/clientStorage';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const requestLogin = () => ({
  type: LOGIN_REQUESTED,
}
);

export const LOGIN_RESULT_RECEIVED = 'LOGIN_RESULT_RECEIVED';
export const loginResultReceived = (hasError) => ({
  type: LOGIN_RESULT_RECEIVED,
  hasError,
}
);

function setUsernameFromResponse(jsonBody) {
  const { username, imageUrl, fullName } = jsonBody;
  setLoggedInUser(username, imageUrl, fullName);
}

export const login = (username, password) =>
    (dispatch) => {
      // tell app we're requesting a login;
      dispatch(requestLogin());

      return _login(username, password)
        .then(({ body }) => {
          // redirect to home page again
          setUsernameFromResponse(body);
          dispatch(loginResultReceived(false));
        })
        .catch(err => {
          dispatch(loginResultReceived(true));
          console.log('auth failed', err);
        });
    };
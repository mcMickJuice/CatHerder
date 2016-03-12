import { login as _login } from '../services/authenticationService';

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

function setUsernameFromResponse(res) {
  console.log('setting username', res.username);
}

export const login = (username, password) =>
    (dispatch) => {
      // tell app we're requesting a login;
      dispatch(requestLogin());

      return _login(username, password)
        .then(res => {
          // redirect to home page again
          // set username in cookie
          setUsernameFromResponse(res);
          dispatch(loginResultReceived(false));
        })
        .catch(err => {
          dispatch(loginResultReceived(true));
          console.log('auth failed', err);
        });
    };
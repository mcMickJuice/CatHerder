import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import LoginError from './containers/LoginError';
import LoginForm from './components/LoginForm';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const loginStore = createStore(reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ));

const LoginApp = () =>
  (
    <Provider store={loginStore}>
      <div>
        <LoginForm />
        <LoginError />
      </div>
    </Provider>
  );

export default LoginApp;


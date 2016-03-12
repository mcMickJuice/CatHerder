import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { login } from '../actions';

let Login = ({ dispatch }) => { // eslint-disable-line react/prop-types
  let textInput;
  let passwordInput;

  function onSubmit() {
    const textVal = textInput.value;
    const passwordVal = passwordInput.value;

    if (textVal.length !== 0 && passwordVal.length !== 0) {
      dispatch(login(textVal, passwordVal));
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" ref={function textRef(node) { textInput = node;}} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" ref={function passwordRef(node) { passwordInput = node; }} />
      </div>
      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  );
};

Login = connect()(Login);

export default Login;

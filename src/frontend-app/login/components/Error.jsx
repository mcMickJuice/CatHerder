import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars

const LoginError = ({ isRequestInFlight, invalidCredentials }) => {
  if (isRequestInFlight) {
    return (
      <div>
        Request in Flight
      </div>
    );
  }

  if (invalidCredentials) {
    return (<div>Unable to verify your credentials</div>);
  }

  return <span>No error</span>;
};

LoginError.propTypes = {
  isRequestInFlight: PropTypes.bool.isRequired,
  invalidCredentials: PropTypes.bool.isRequired,
};

export default LoginError;


import { connect } from 'react-redux';
import Login from '../components/Error';

const mapStateToProps = (state) => ({
  isRequestInFlight: state.isRequestInFlight,
  invalidCredentials: state.invalidCredentials,
}
);

const LoginError = connect(mapStateToProps)(Login);

export default LoginError;

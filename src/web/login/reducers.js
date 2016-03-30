import {LOGIN_RESULT_RECEIVED, LOGIN_REQUESTED} from './actions';

const defaultState = {
	isRequestInFlight: false,
	invalidCredentials: false
};

function login(state = defaultState, action) {
	switch (action.type) {
		case (LOGIN_RESULT_RECEIVED):
			return Object.assign({}, state, {
				isRequestInFlight: false,
				invalidCredentials: action.hasError
			});
		case (LOGIN_REQUESTED):
			return Object.assign({}, state, {
				isRequestInFlight: true,
				invalidCredentials: false
			});
		default:
			return state;
	}
}

export default login;

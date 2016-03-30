import requestClient from './requestClient';
import {loginUrl, logoutUrl, verifyUrl} from './endpointConfig';

/**
 * Login to catherder service
 * @param {string} username
 * @param {string} password
 * @returns {Promise.<Response>}
 */
export const login = (username, password) => {
	const body = {
		username,
		password
	};

	return requestClient
		.post(loginUrl)
		.send(body)
		.end()
		.then(res => res)
		.catch(err => {
			console.log('an error has occurred authenticating', err);
			throw err;
		});
};

/**
 * Logout of service
 * @param {string} username
 * @returns {Promise.<Response>}
 */
export const logout = (username) => {
	const body = {
		username
	};

	return requestClient
		.post(logoutUrl)
		.send(body)
		.end()
		.then(res => {
			console.log('logout successful', res);
		})
		.catch(err => {
			console.log('an error has occurred logging out', err);
		});
};

/**
 * Make request to app to verify that user is authenticated
 * @returns {Promise.<Boolean>}
 */
export const checkIfLoggedIn = () => (
	requestClient
		.post(verifyUrl)
		.end()
		.then(res => {
			console.log('user is verified', res);
			return true;
		})
		.catch(err => {
			// check status?
			console.log('user is not verified, must sign in', err);
			return false;
		})
);

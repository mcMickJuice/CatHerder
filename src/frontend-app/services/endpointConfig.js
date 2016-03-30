const baseUrl = 'http://localhost:4000/auth';

function combinePath(...args) {
	return args.join('/');
}

export const loginUrl = combinePath(baseUrl, 'login');

export const logoutUrl = combinePath(baseUrl, 'logout');

export const verifyUrl = combinePath(baseUrl, 'verify');


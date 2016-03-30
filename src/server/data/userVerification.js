import {connection} from './dbConnection';

const USER_COLLECTION = 'users';

export function verifyUser(credentials) {
	return connection()
		.then(conn => {
			const users = conn.collection(USER_COLLECTION);

			const {username, password} = credentials;
			// TODO replace deprecated method and specify to return only username, imageUrl, fullName
			return users.findOne({username, password});
		})
		.then(user => {
			if (!user) {
				// user not found
				return false;
			}

			// TODO return more than just username?
			const {username, imageUrl, fullName} = user;
			return {username, imageUrl, fullName};
		});
}

export default function (env) {
	return function errorMiddleware(err, req, res, next) { // eslint-disable-line no-unused-vars
		// obfuscate stacktrace if in production

		if (env.toLowerCase() === 'production') {
			res.json({
				message: 'An error has occurred'
			});
		} else {
			res.json({
				message: `An error has occurred - ${err.message}`,
				reason: err.stack
			});
		}
	};
}

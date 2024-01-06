class ErrorResponse extends Error {
	constructor(statusCode = 500, message = 'Internal Server Error', data = undefined, stack = undefined ) {
		super(message);
		this.statusCode = statusCode;

		if (stack && this.stack) {
			this.stack += '\n' + stack;
		} else {
			this.stack = this.stack || stack;
		}
	}
}

module.exports = ErrorResponse;

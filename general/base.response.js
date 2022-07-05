const CREATED = 201;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const errorResponse = (error, res, errorMessage = `${error}`) => {
	let status = CREATED;
	if (error instanceof TypeError || error instanceof SyntaxError)
		status = INTERNAL_SERVER_ERROR;
	else if (error instanceof Error || error instanceof ReferenceError)
		status = BAD_REQUEST;
	return res.status(status).json({
		error: { name: error.name, message: error.message || errorMessage },
	});
};

const successResponse = { message: "success" };

module.exports = {
	CREATED,
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
	errorResponse,
	successResponse,
};

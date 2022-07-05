const express = require("express");

class BaseController {
	constructor() {}

	unhandledControllerResponse(request, response) {
		response.send("<h3>Unhandled controller</h3>");
	}

	post(request = express.request, response = express.response) {
		unhandledControllerResponse(request, response);
	}

	get(request = express.request, response = express.response) {
		unhandledControllerResponse(request, response);
	}

	getOne(request, response) {
		unhandledControllerResponse(request, response);
	}

	put(request = express.request, response = express.response) {
		unhandledControllerResponse(request, response);
	}

	delete_(request = express.request, response = express.response) {
		unhandledControllerResponse(request, response);
	}
}

module.exports = {
	BaseController,
};

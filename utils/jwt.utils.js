const jwt = require("jsonwebtoken");
const { AdminUser } = require("../admin/models");
require("dotenv").config();

const createToken = (payload) => {
	const token = jwt.sign({ name: payload }, process.env.API_SECRET_KEY);
	return token;
};

const verifyToken = (req) => {
	const token =
		req.headers["x-authorization"] ||
		req.body.token ||
		req.headers["authorization"]?.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.API_SECRET_KEY);
	return { decodedToken, token };
};

const verifyUserIsAdmin = async (req) => verifyToken(req).decodedToken;

module.exports = { verifyUserIsAdmin, verifyToken, createToken };

const jwt = require("jsonwebtoken");
const { AdminUser } = require("../admin/models");
require("dotenv").config();

const defaultApiKey =
	"?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThWmZq4t6w9z$C&F)J@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F)J@NcRfUjXn2r5u8x/A?D(G+KaPdSg";

const createToken = (payload) => {
	const token = jwt.sign(
		payload,
		process.env.API_SECRET_KEY || defaultApiKey,
	);
	return token;
};

const verifyToken = (req) => {
	const token =
		req.headers["x-authorization"] ||
		req.body.token ||
		req.headers["authorization"]?.split(" ")[1];
	const decodedToken = jwt.verify(
		token,
		process.env.API_SECRET_KEY || defaultApiKey,
	);
	return { decodedToken, token };
};

const verifyUserIsAdmin = async (req) => {
	const { decodedToken } = verifyToken(req);

	const adminUser = await AdminUser.findOne({
		where: { username: decodedToken.username },
	});

	if (adminUser.password !== decodedToken.password)
		throw new Error("Invalid credentials");

	return decodedToken;
};

module.exports = { verifyUserIsAdmin, verifyToken, createToken };

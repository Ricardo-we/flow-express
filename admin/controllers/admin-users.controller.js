const { BaseController } = require("../../general/BaseController");
const { errorResponse } = require("../../general/base.response");
const { AdminUser } = require("../models");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/jwt.utils");

const successMessage = { message: "success" };
class AdminUsersController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const { model_name } = req.query;

			res.json(successMessage);
		} catch (error) {
			console.error(error);
			errorResponse(error, res);
		}
	}

	async authenticate(req, res) {
		try {
			const { username, password } = req.body;
			const user = await AdminUser.findOne({ where: { username } });

			if (!user) throw new Error("Invalid usernmae");
			if (!bcrypt.compareSync(password, user.password))
				throw new Error("Invalid password");
			const token = createToken(user);

			res.status(200).json({ token });
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const fields = [
				{ name: "username", type: "text", placeholder: "Username" },
				{ name: "password", type: "password", placeholder: "Password" },
			];
			res.render("admin/login", { fields, error: req?.query?.errors });
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			return res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			return res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async delete_(req, res) {
		try {
			const { id } = req.query;

			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}
}

module.exports = AdminUsersController;

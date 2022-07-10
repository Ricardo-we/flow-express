const { BaseController } = require("../general/BaseController");
const { errorResponse } = require("..//general/base.response");
const Admin = require("./Admin");

const successMessage = { message: "success" };
class AdminController extends BaseController {
	constructor(connection, adminModelsList) {
		super();
		this.admin = new Admin(connection, adminModelsList);
		this.admin.registerModels();
	}

	async post(req, res) {
		try {
			const { model_name } = req.query;
			this.admin.insertIntoModel(model_name, req.body);
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const adminModels = await this.admin.AdminModel.findAll({});
			res.status(200).json(adminModels);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			const { model_name } = req.params;
			const modelRecords = await this.admin.getModelData(model_name);
			res.json(modelRecords);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			const { pkIdentifier, id } = req.query;
			const { model_name } = req.params;
			const updatedData = await this.admin.updateModel(
				model_name,
				req.body,
				pkIdentifier || "id",
				id,
			);

			return res.json(updatedData);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async delete_(req, res) {
		try {
			const { model_name } = req.params;
			const { pkIdentifier, id } = req.query;
			await this.admin.deleteFromModel(
				model_name,
				pkIdentifier || "id",
				id,
			);

			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}
}

module.exports = AdminController;

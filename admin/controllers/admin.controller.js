const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { AdminRegisteredModels } = require("../models");

const admin = require("../admin");

const successMessage = { message: "success" };
class AdminController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const { model_name } = req.query;
			const model = await AdminRegisteredModels.findOne({
				where: {
					model_name: model_name || null,
				},
			});

			const newInsert = await admin?.models[model.model_name]?.create(
				req.body,
			);

			res.json(newInsert);
		} catch (error) {
			console.error(error);
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const adminModels = await AdminRegisteredModels.findAll({});

			res.render("admin/index", { models: adminModels });
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			const { model_name } = req.params;
			const model = await AdminRegisteredModels.findOne({
				where: { model_name },
			});

			const modelRecords = await admin.models[
				model?.model_name
			]?.findAll();
			const modelDetails = await admin.getModelData(model.model_name);
			res.json({ modelRecords, modelDetails });
		} catch (error) {
			console.error(error);
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			const { model_name } = req.params;
			const { id } = req.query;

			const model = await AdminRegisteredModels.findOne({
				where: { model_name },
			});

			const updatedData = await admin.models[model.model_name].update(
				req.body,
				{ where: { id } },
			);

			return res.json(updatedData);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async delete_(req, res) {
		try {
			const { model_name } = req.params;
			const { id } = req.query;
			const model = await AdminRegisteredModels.findOne({
				where: { model_name },
			});
			if (!model) throw new Error("Model not registered");
			await admin.models[model.model_name]?.destroy({
				where: { id },
			});

			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async deleteRegisteredModel(req, res) {
		try {
			const { id } = req.params;
			await AdminRegisteredModels.destroy({ where: { id } });
			return successMessage;
		} catch (error) {
			errorResponse(error, res);
		}
	}
}

module.exports = AdminController;

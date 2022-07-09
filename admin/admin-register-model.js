const { IDField } = require("../db/base-fields");
const { DataTypes } = require("sequelize");

class Admin {
	constructor(connection) {
		this.connection = connection;
		this.AdminModel = this.connection.define("admin_tables", {
			id: IDField,
			model_name: {
				type: DataTypes.STRING,
				unique: true,
			},
		});
	}

	async registerModels(modelNamesList = []) {
		const models = modelNamesList.map((model) => ({ model_name: model }));
		const modelsResult = [];
		for (const modelFilterParams of models) {
			const registered = await AdminRegisteredModels.findOrCreate({
				where: modelFilterParams,
			});
			modelsResult.push(registered);
		}
		return modelsResult;
	}

	async getModelData(model_name) {
		const model_ = await this.AdminModel.findOne({ where: { model_name } });
		return await this.connection.query(
			`SELECT * FROM ${model_.model_name}`,
		);
	}

	async insertIntoModel(model_name, values = []) {
		const model_ = await this.AdminModel.findOne({ where: { model_name } });
		return await this.connection.query(
			`INSERT INTO ${model_.model_name} VALUES ${values.join(",")}`,
		);
	}

	async deleteFromModel(model_name, identifierColumnName, identifier) {
		const model_ = await this.AdminModel.findOne({ where: { model_name } });
		return await this.connection.query(
			`DELETE FROM  ${model_.model_name} WHERE ${identifierColumnName}=${identifier}`,
		);
	}

	async updateModel(
		model_name,
		updateColumns = {},
		identifierColumnName,
		identifier,
	) {
		const model_ = await this.AdminModel.findOne({ where: { model_name } });
		const updateData = Object.entries(updateColumns);
		let query = "";
		for (const keyVal of updateData) {
			query += `${keyVal[0]}=${keyVal[1]}`;
		}

		return await this.connection.query(
			`UPDATE FROM ${model_.model_name} SET ${query} WHERE ${identifierColumnName}=${identifier}`,
		);
	}
}

module.exports = {};

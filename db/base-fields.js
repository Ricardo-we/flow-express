const { DataTypes } = require("sequelize");

const IDField = {
	type: DataTypes.INTEGER,
	autoIncrement: true,
	primaryKey: true,
	validate: {
		isInt: {
			msg: "id field must be integer",
		},
	},
};

module.exports = {
	IDField,
};

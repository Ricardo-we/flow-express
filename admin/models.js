const { DataTypes } = require("sequelize");
const { IDField } = require("../db/base-fields");
const { sequelize } = require("../../../src/config/db.config");
const bcrypt = require("bcrypt");

const AdminRegisteredModels = sequelize.define("admin", {
	id: IDField,
	model_name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
});

const AdminUser = sequelize.define(
	"admin_user",
	{
		id: IDField,
		username: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				len: [5, 255],
			},
		},
	},
	{
		hooks: {
			beforeCreate(user) {
				user.password = bcrypt.hashSync(user.password, 10);
				return user;
			},
			beforeUpdate(user) {
				user.password = bcrypt.hashSync(user.password, 10);
				return user;
			},
		},
	},
);

module.exports = { AdminRegisteredModels, AdminUser };

const BaseRouter = require("../general/BaseRouter");
const AdminController = require("./admin-controller");
const { getAppsModels } = require("../utils/model-utils");

module.exports = (adminModelNamesList, dbConnection, authMiddleware) => {
	const adminController = new AdminController(
		dbConnection,
		adminModelNamesList,
	);
	const router = new BaseRouter(
		"/flowex-admin",
		":model_name",
		adminController,
		{
			get: authMiddleware,
			getOne: authMiddleware,
			post: authMiddleware,
			put: authMiddleware,
			delete: authMiddleware,
		},
	);
	return router;
};

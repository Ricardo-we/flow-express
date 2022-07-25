const AdminController = require("./controllers/admin.controller");
const AdminUserController = require("./controllers/admin-users.controller");

const BaseRouter = require("../general/BaseRouter.js");
const { verifyUserIsAdmin } = require("../utils/jwt.utils");

async function adminAuthMiddleware(req, res, next) {
	try {
		req.user = await verifyUserIsAdmin(req);
		next();
	} catch (error) {
		errorResponse(error, res);
	}
}

const controller = new AdminController();
const adminUsersController = new AdminUserController();
const router = new BaseRouter("/admin", ":model_name", controller, {
	post: adminAuthMiddleware,
	put: adminAuthMiddleware,
	delete: adminAuthMiddleware,
	getOne: adminAuthMiddleware,
});

router.registerRoute(adminUsersController, "/admin-users", { params: ":id" });
router.router.post("/admin-users/login", adminUsersController.authenticate);
module.exports = router;

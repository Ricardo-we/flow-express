const { Router } = require("express");

const BaseController = require("./BaseController");

class BaseRouter {
	constructor(
		routeName = "",
		params = ":id",
		controller = new BaseController(),
		allRoutesColors = {
			GET: "rgba(0, 255, 168, 0.8)",
			POST: "rgba(0, 194, 255, 0.8)",
			PUT: "rgba(241, 255, 0, 0.8)",
			DELETE: "rgba(245, 0, 0, 0.8)",
		},
	) {
		this.router = Router();
		this.routeName = routeName;
		this.params = params;
		this.controller = controller;
		this.colors = allRoutesColors;
		this.createRoutes(this.controller);
	}

	undefinedRouteMethod(req, res) {
		return res.send("<h2>Invalid method</h2>");
	}

	createRoutes(controller, putParams, deleteParams, getOneParams) {
		return this.registerRoute(controller, this.routeName, {
			params: this.params,
			putParams,
			deleteParams,
			getOneParams,
		});
	}

	registerRoute(
		controller,
		routeName,
		{ params, getOneParams, putParams, deleteParams },
	) {
		this.router.get(
			`${routeName}`,
			controller?.get || this.undefinedRouteMethod,
		);
		this.router.get(
			`${routeName}/${getOneParams || params}`,
			controller?.getOne || this.undefinedRouteMethod,
		);
		this.router.post(
			`${routeName}`,
			controller?.post || this.undefinedRouteMethod,
		);
		this.router.put(
			`${routeName}/${putParams || params}`,
			controller?.put || this.undefinedRouteMethod,
		);
		this.router.delete(
			`${routeName}/${deleteParams || params}`,
			controller?.delete_ || this.undefinedRouteMethod,
		);
		// GET ALL ROUTES
		this.router.get(`${routeName}/routes/all`, (req, res) =>
			res.send(this.getRoutes(routeName)),
		);
	}

	getRoutes(routeName) {
		let result = ``;
		for (const route of this.router.stack) {
			const method = Object.keys(route.route.methods)[0].toUpperCase();
			if (!route.route.path.includes(routeName)) continue;
			result += `
				<h3 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: ${this.colors[method]};border-bottom: 1px solid black;">
				${method} ${route.route.path}
				</h3>
			`;
		}
		return `
			<div style="background-color: #fff; width: 100%; height: auto">
				${result} 
			</div>
		`;
	}
	getRouter() {
		return this.router;
	}
}

module.exports = BaseRouter;

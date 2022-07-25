const { Router } = require("express");

const BaseController = require("./BaseController");

class BaseRouter {
	constructor(
		routeName = "",
		params = ":id",
		controller = new BaseController(),
		middleware,
		routeFieldsTemplate,
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
		this.createRoutes(this.controller, middleware, routeFieldsTemplate);
	}

	undefinedRouteMethod(req, res) {
		return res.send("<h2>Invalid method</h2>");
	}

	createRoutes(
		controller,
		middleware,
		routeFieldsTemplate,
		putParams,
		deleteParams,
		getOneParams,
	) {
		return this.registerRoute(controller, this.routeName, {
			params: this.params,
			middlewares: middleware,
			routeFieldsTemplate,
			putParams,
			deleteParams,
			getOneParams,
		});
	}

	defaultMiddleWare(req, res, next) {
		return next();
	}

	registerRoute(
		controller,
		routeName,
		{
			params,
			routeFieldsTemplate,
			middlewares,
			getOneParams,
			putParams,
			deleteParams,
		},
	) {
		this.router.get(
			`${routeName}`,
			middlewares?.get || this.defaultMiddleWare,
			controller?.get || this.undefinedRouteMethod,
		);
		this.router.get(
			`${routeName}/${getOneParams || params}`,
			middlewares?.getOne || this.defaultMiddleWare,
			controller?.getOne || this.undefinedRouteMethod,
		);
		this.router.post(
			`${routeName}`,
			middlewares?.post || this.defaultMiddleWare,
			controller?.post || this.undefinedRouteMethod,
		);
		this.router.put(
			`${routeName}/${putParams || params}`,
			middlewares?.put || this.defaultMiddleWare,
			controller?.put || this.undefinedRouteMethod,
		);
		this.router.delete(
			`${routeName}/${deleteParams || params}`,
			middlewares?.delete || this.defaultMiddleWare,
			controller?.delete_ || this.undefinedRouteMethod,
		);
		// GET ALL ROUTES
		this.router.get(`${routeName}/routes/all`, (req, res) =>
			res.send(this.getRoutes(routeName, routeFieldsTemplate)),
		);
	}

	getRoutes(routeName, routeFieldsTemplate) {
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
				<h3 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: #FF5733;">
					Route fields
				</h3>
				<pre
					style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: #000;border-bottom: 1px solid black;"
				>
${JSON.stringify(
	routeFieldsTemplate || { fields: "Fields aren´t registered" },
	null,
	"\t",
)}
				</pre>
			</div>
		`;
	}
	getRouter() {
		return this.router;
	}
}

module.exports = BaseRouter;

const getAppsModels = (registeredApps, initialPath = "./src/apps/") => {
	let models = [];
	for (const app of registeredApps) {
		const appName = typeof app === "object" ? app?.name : app;
		const model = Object.values(
			require(`../../../${initialPath}${appName}/models.js`),
		);
		for (const singleModel of model) {
			models.push(singleModel);
		}
	}
	return models;
};

module.exports = { getAppsModels };

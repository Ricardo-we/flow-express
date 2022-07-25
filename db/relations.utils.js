function oneToManyRelation(parentModel, childModel, foreignKeyOptions) {
	childModel.belongsTo(parentModel, foreignKeyOptions);
	parentModel.hasMany(childModel, foreignKeyOptions);
	return { parentModel, childModel };
}

function oneToOneRelation(parentModel, childModel, foreignKeyOptions) {
	childModel.belongsTo(parentModel, foreignKeyOptions);
	parentModel.hasOne(childModel, foreignKeyOptions);
	return { parentModel, childModel };
}

function manyToManyRelation(model1, model2, options = { through: "C" }) {
	model1.belongsToMany(Actor, options);
	model2.belongsToMany(Movie, options);
	return { model1, model2 };
}

module.exports = { oneToManyRelation, oneToOneRelation, manyToManyRelation };

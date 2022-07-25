function manyToManyRelation(parentModel, childModel, options) {
	parentModel.hasMany(childModel, options);
	childModel.belongsTo(parentModel, options);
	return { parentModel, childModel };
}

module.exports = { manyToManyRelation };

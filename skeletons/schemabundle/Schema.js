var {{ name | capitalize }}Schema = function(di) {
	validate = di.validate;
	validator = di.validators.{{ name | lower }};

	this.json = {
		id : di.mongoose.Schema.ObjectId
	};

	this.mongoose = new di.mongoose.Schema(this.json);
};

module.exports = exports = {{ name | capitalize }}Schema;
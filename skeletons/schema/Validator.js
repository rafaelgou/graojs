var {{ schema | capitalize }}Validator = function(di) {
	this.validate = di.validate;
	return {
	};
};

module.exports = exports = {{ schema | capitalize }}Validator;
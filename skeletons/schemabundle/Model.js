var {{ name | capitalize }} = function(di) {
	di.schemas.{{ name | lower }}.mongoose.methods = {
	};

	return di.mongoose.model("{{ name | capitalize }}", di.schemas.{{ name | lower }}.mongoose);
};

module.exports = exports = {{ name | capitalize }};
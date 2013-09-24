var mongoose = require("mongoose")
	,extend = require("mongoose-schema-extend")
	,Schema = mongoose.Schema
	,schema = new require("./schema");
 
var objectSchema = schema.extend({
});

module.exports = mongoose.model("{GRAO}{UCFIRST}{BUNDLE_NAME}", objectSchema);
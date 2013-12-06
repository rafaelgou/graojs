/**
 * {{ schema | capitalize }}Schema
 *
 * Application {{ description }}
 */

var {{ schema | capitalize }}Schema = function(di) {
  validate = di.validate;
  validator = di.validators.{{ schema | lower }};

  this.json = {
	id : di.mongoose.Schema.ObjectId

  };

  this.mongoose = new di.mongoose.Schema(this.json);
};

module.exports = exports = {{ schema | capitalize }}Schema;
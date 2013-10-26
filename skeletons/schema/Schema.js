var {{ name | capitalize }}Schema = function(di) {
  validate = di.validate;
  validator = di.validators.{{ name | lower }};

  this.json = {
    id : di.mongoose.Schema.ObjectId

// SAMPLE FIELD
// ------------
//    , yourFieldName : {
//      type : String,
//      lowercase : true,
//      required : true,
//      index : true,
//      unique : true,
//      trim : true,
//      validate : validator.validatorName
//    }

  };

  this.mongoose = new di.mongoose.Schema(this.json);
};

module.exports = exports = {{ name | capitalize }}Schema;
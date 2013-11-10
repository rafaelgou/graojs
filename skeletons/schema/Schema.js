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

// SAMPLE FIELD
// ------------
//    ,
//    yourFieldName : {
//      type : String,
//      lowercase : true,
//      required : true,
//      index : true,
//      unique : true,
//      trim : true,
//      validate : validator.validatorName,
//      graoui: {
//        label: 'Field Label',
//        type: '', // INPUTS: text, checkbox, radio, file, hidden, email, date, url | select, textarea
//        options: { } // For SELECT/INPUT RADIO the option 'choices' are required
//        attr: { } // Any extra html attributes, such 'class', 'style', 'placeholder', 'data-*', 'ng-*'
//      }
//    }

  };

  this.mongoose = new di.mongoose.Schema(this.json);
};

module.exports = exports = {{ schema | capitalize }}Schema;
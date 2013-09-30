var mongoose = require('mongoose')
	,validate = require('mongoose-validator').validate
	,Schema = mongoose.Schema
	,ObjectId = Schema.ObjectId;

var json = 
{
		id : ObjectId,
	    name : {
	        type : String,
	        required: true,
	        index: true,
	        unique: true,
	        trim: true 
	    },
	    alias : {
	        type : String,
	        lowercase: true,
	        required: true,
	        index: true,
	        unique: true,
	        trim: true 
	    },
	    descricao : {
	        type : String,
	    },
	    relations : [json],
	    states: { 
	    	type: String 
	    }
};

var schema = new Schema(json);

module.exports.json = json;
module.exports = schema;

var businessMethods = {
		
	businessLogic1 : function() {
		
		return 1+this.businessLogic2();
	},

	businessLogic2 : function() {
		return 2;
		//throw "Business error!";
	},

	hashPassword : function(password) {
		if (password.length < 10)
			return null;
		di.hash.update(password + 
				"GraoJSASD1321i90312i9k0jhdsa2013dsaAdfas4fadasDSA23ADS91221dsaFOSS");
		return di.hash.digest('hex');
	}
};

var User = function(di) {

	this.business = di.schemas.user.mongoose.methods = businessMethods;
	return di.mongoose.model("User", di.schemas.user.mongoose);
};

module.exports = exports = User;
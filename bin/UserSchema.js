var UserSchema = function(di) {
    validate = di.validate;
    validator = di.validators.user;

    this.json = {
        id : di.mongoose.Schema.ObjectId,
        username : {
            type : String,
            required : false,
            trim : true,
            graoui: {
                label: "User Name",
                type: 'input'
            }
        },
        password : {
            type : String,
            required : false,
            graoui: {
                label: "Password",
                type: 'password'
            }
        },
        name : {
            type : String,
            required : false,
            trim : true,
            graoui: {
                label: "Name",
                type: 'input'
            }
        },
        email : {
            type : String,
            lowercase : true,
            required : false,
            index : true,
            unique : false,
            trim : true,
            validate : validate('isEmail'),
            graoui: {
                label: "Email",
                type: 'email'
            }
        },
        blog : {
            type : String,
            lowercase : true,
            required : false,
            trim : true,
            validate : validate('isUrl'),
            graoui: {
                label: "Blog",
                type: 'url'
            }
        },
    };

    this.mongoose = new di.mongoose.Schema(this.json);
};

module.exports = exports = UserSchema;

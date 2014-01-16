var UserSchema = function(di) {
  validate = di.validate;
  validator = di.validators.user;

  this.json = {
    id : di.mongoose.Schema.ObjectId,
    groups: [{ 
      type: di.mongoose.Schema.Types.ObjectId, 
      ref: 'Group',
      graoui: {
        label: "Groups",
        fieldRefLabel: "name",
        type: "select",
        attr: { multiple: true }
      }
    }],
    name : {
      type : String,
      required : false,
      trim : true,
      graoui: {
        label: "Name",
        type: 'input'
      }
    },
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
    born : {
      type: Number,
      graoui: {
        label: "Born",
        type: 'date'
      }
    },
    kids : {
      type: Number,
      graoui: {
        label: "Kids",
        type: 'number'
      }
    },
    sex : {
      type: String,
      graoui: {
        label: "Sex",
        type: 'radio',
        options: { "M": "Masculine", "F": "Feminine" }
      }
    },
    news : {
      type: Boolean,
      graoui: {
        label: "Do you want to receive news ?",
        type: 'checkbox',
        value: "IS_NEWS",
        attr: { checked: true }
      }
    },
    languages : {
      type: Array,
      graoui: {
        label: "Languages",
        type: 'select',
        options: { "PHP": "PHP Language", "JAVA": "Java Language", "JAVASCRIPT": "Javascript Language", "PYTHON": "Python Language", "RUBY": "Ruby Language" },
        attr: { multiple: true }
      }
    },
    distros : {
      type: Array,
      graoui: {
        label: "Distributions",
        type: 'select', // https://github.com/localytics/angular-chosen ? https://github.com/angular-ui/ui-select2 ?
        options: [ "Ubuntu", "Fedora", "Debian", "Mint", "Slackware", "Gentoo" ],
        attr: { multiple: true }
      }
    },
    address : {
      type: String,
      graoui: {
        label: "Address",
        type: 'textarea',
        attr: { placeholder: "Your Address" }
      }
    },
    money : {
      type: Number,
      graoui: {
        label: "Money",
        type: 'currency'
      }
    },
    likes: [{ type: di.mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: di.mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: di.mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: di.mongoose.Schema.Types.ObjectId, ref: 'User' }]
  };

  this.mongoose = new di.mongoose.Schema(this.json);
};

module.exports = exports = UserSchema;

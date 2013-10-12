var args = process.argv.slice(2);
var name, fileName;

for ( var i = 0; i < args.length; i++) {
	switch (args[i]) {
	case '--name':
		fileName = args[i + 1];
		name = fileName.replace(/Schema/gi, '');
	}
};

var GraoGeneratorConfig = {
	fileName : fileName,
	name : name,
	route : false,
	controller : false,
	validator : false,
	model : false,
	publicJs : false,
	view : false,
	all : false,
	forceRewrite : false,
	verbose : true,

	files : {
		schema : './schemas/' + fileName + '.js',
		route : './preprocessors/Route.js',
		controller : './preprocessors/Controller.js',
		model : './preprocessors/Model.js',
		validator : './preprocessors/Validator.js',
		publicJsController : './preprocessors/public/js/PublicController.js',
		viewDashboard : './preprocessors/view/dashboard.jade',
		viewForm : './preprocessors/view/form.jade',
		viewGrid : './preprocessors/view/grid.jade',
		viewCurrency : './preprocessors/view/currency.jade',
		viewDate : './preprocessors/view/date.jade',
		viewInputCheckbox : './preprocessors/view/input_checkbox.jade',
		viewInputEmail : './preprocessors/view/input_email.jade',
		viewInputNumber : './preprocessors/view/input_number.jade',
		viewInputRadio : './preprocessors/view/input_radio.jade',
		viewInputText : './preprocessors/view/input_text.jade',
		viewInputUrl : './preprocessors/view/input_url.jade',
		viewSelect : './preprocessors/view/input_select.jade',
		viewTextarea : './preprocessors/view/input_textarea.jade'
	},

	parseOptions : function() {
		for ( var i = 0; i < args.length; i++) {
			switch (args[i]) {
			case '--name':
				i++;
				break;
			case '--route':
				this.route = true;
				break;
			case '--validator':
				this.validator = true;
				break;
			case '--controller':
				this.controller = true;
				break;
			case '--model':
				this.model = true;
				break;
			case '--public-js':
				this.publicJs = true;
				break;
			case '--view':
				this.view = true;
				break;
			case '--all':
				this.all = true;
				break;
			case '--force':
				this.forceRewrite = true;
				break;
			case '--verbose':
				this.verbose = true;
				break;
			default:
				console.log('Option ' + args[i] + ' not recognized.');
			}
		}
		;
	},
};

module.exports = exports = GraoGeneratorConfig;
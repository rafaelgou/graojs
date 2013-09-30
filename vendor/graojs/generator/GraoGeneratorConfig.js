var args = process.argv.slice(2);
var name;

for ( var i = 0; i < args.length; i++) {
	switch (args[i]) {
	case '--name':
		name = args[i + 1];
	}
};

var GraoGeneratorConfig = {
	name : name,
	route : false,
	control : false,
	model : false,
	publicJs : false,
	view : false,
	all : false,
	forceRewrite : false,
	verbose : true,

	files : {
		schema : './schemas/' + name + '.js',
		route : './preprocessors/route.js',
		control : './preprocessors/control.js',
		model : './preprocessors/model.js',
		valid : './preprocessors/valid.js',
		publicJsControl : './preprocessors/public_js/control.js',
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
			case '--control':
				this.control = true;
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
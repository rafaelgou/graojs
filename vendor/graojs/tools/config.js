var args = process.argv.slice(2);
var bundleName;

for ( var i = 0; i < args.length; i++) {
	switch (args[i]) {
	case '--name':
		bundleName = args[i + 1];
	}
};

module.exports = exports = {
	name: name,
	newApp: false,
	newBundle: false,
	newSchema: false,
	generate: false,
	forceRewrite: false,
	verbose: true,
	start: false,

	parseOptions : function() {
		for ( var i = 0; i < args.length; i++) {
			switch (args[i]) { 
				case '-a':
				case '--app':
				case '--new-app':
					this.newApp = true;
					break;
				case '-b':
				case '--bundle':
				case '--new-bundle':
					this.newBundle = true;
					break;
				case '-e':
				case '--schema':
				case '--new-schema':
					this.newSchema = true;
					break;
				case '-g':
				case '--gen':
				case '--generate':
					this.generate = true;
					break;
				case '-f':
				case '--force':
					this.forceRewrite = true;
					break;
				case '--verbose':
					this.verbose = true;
					break;
				case '--start':
				case '-s':
				default:
					this.start = true;
					console.log('Starting app.');
			}
		}
	},
};
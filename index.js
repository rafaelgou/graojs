var http = require('http'),
	express = require('express'),
	graoExpress = express(),
	kernel = new (require('./core/GraoKernel'))({
						config: require('./../../config/prod'), 
						graoExpress: graoExpress, 
						express: express}),
	servers = new Array(),
	i18n = require('i18n');

var GraoJS = function() {
	
	kernel.logger.info('Setting global configs...');
	
	i18n.configure({
	    locales: ['en', 'pt-br'],
	    cookie: 'locale',
	    defaultLocale: 'en',
	    directory: kernel.config.locales
	});

	graoExpress.configure(function(){
		graoExpress.set('views', kernel.config.view);
		graoExpress.set('view engine', 'jade');
		graoExpress.enable('jsonp callback');

		graoExpress.use(express.methodOverride());
		graoExpress.use(express.cookieParser());
		graoExpress.use(express.bodyParser());
		graoExpress.use(i18n.init);

		kernel.publics.enable({
			express: express, 
			graoExpress: graoExpress, 
			event: kernel.event, 
			config: kernel.config
		});
		
		graoExpress.use(graoExpress.router);
	});

	kernel.routes();
	
	this.start = function() {
		kernel.logger.info('GrãoJS starting... open in your browser:');
		for(portIndex in kernel.config.ports)
		{
			servers.push(graoExpress.listen(kernel.config.ports[portIndex]));
			kernel.logger.info('http://localhost:'+kernel.config.ports[portIndex]);
		}
	};
	
	this.stop = function() {
		kernel.logger.info('GrãoJS shutdown...');
		for(serverIndex in servers)
		{
			servers[serverIndex].close();
		}
	};
	
	this.restart = function(){
		this.stop();
		this.start();
	};
};

module.exports = exports = GraoJS;


var http = require('http'),
	express = require('express'),
	grao = express(),
	kernel = new (require('./vendor/graojs/core/kernel'))({
						config: require('./config/prod'), 
						grao: grao, 
						express: express}),
	i18n = require('i18n');

kernel.logger.info('Setting global configs...');

i18n.configure({
    locales: ['en', 'pt-br'],
    cookie: 'locale',
    defaultLocale: 'en',
    directory: kernel.config.locales
});

grao.configure(function(){
	grao.set('views', kernel.config.view);
	grao.set('view engine', 'jade');
	grao.enable('jsonp callback');

	grao.use(express.methodOverride());
	grao.use(express.cookieParser());
	grao.use(express.bodyParser());
	grao.use(i18n.init);

	kernel.publics.enable({
		express: express, 
		grao: grao, 
		event: kernel.event, 
		config: kernel.config
	});
	
	grao.use(grao.router);
});

kernel.routes();

kernel.logger.info('Open in your browser: http://localhost:'+kernel.config.port);
grao.listen(kernel.config.port);

/**
 * Need implement autoloader
 */
var http = require('http')
	,express = require('express')	
	,grao = express()
	,kernel = new (require('./vendor/graojs/core/kernel'))({
							config: require('./config/config'), 
							grao: grao, 
							express: express})
	,i18n = require('i18n');

/**
 * CORS:
var allowCrossDomain = function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept');
	  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	  next();
};
 */
kernel.logger.info('Setting global configs...');

i18n.configure({
    locales: ['pt-br', 'en'],
    cookie: 'locale',
    defaultLocale: 'pt-br',
    directory: kernel.config.locales
});

grao.configure(function(){
	/*if ('development' == app.get('env')) {
			app.use(express.errorHandler());
			app.use(express.favicon());
			app.use(express.logger('dev'));
		}*/
	/*
	l.grao.use(express.logger('dev'));
	grao.use(allowCrossDomain);
	*/
	//grao.set("view options", {layout: false});
	
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

kernel.routes({grao: grao, crontrols: kernel.controls, logger: kernel.logger});
kernel.logger.info('Open in your browser: http://localhost:'+kernel.config.port);
grao.listen(kernel.config.port);

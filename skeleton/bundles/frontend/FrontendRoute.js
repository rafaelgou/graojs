var FrontendRoute = function (di) {
	di.graoExpress.get('/locale/:locale', function (req, res) {
		  res.cookie('locale', req.params.locale);
		  res.setLocale(req.params.locale);
		  console.log('Locale: '+res.getLocale()+' - '+res.__('12345'));
		  res.redirect("/");
	});
	
	di.graoExpress.get('/english', function(req, res){
		res.setLocale('en');
		console.log('Locale: '+res.getLocale()+' - '+res.__('12345'));
		res.send(req.__('dimdim'));
	});
	
	di.graoExpress.get('/', function(req, res) {
		//req.i18n.setLocale('en');
		res.render('frontend/view/index');
		console.log('Locale: '+res.getLocale()+' - '+res.__('12345'));
		res.__('dimdim');
	});
	
	di.graoExpress.get('/home', function(req, res) {
		res.render('frontend/view/index');
	});
	
	di.graoExpress.get('/explore', function(req, res){
		res.render('frontend/view/explore');
	});
	
	di.graoExpress.get('/pricing', function(req, res){
		res.render('frontend/view/pricing');
	});
	
	di.graoExpress.get('/manifest', function(req, res){
		res.render('frontend/view/manifest');
	});
	
	di.graoExpress.get('/events/pull', function(req, res){
		res.jsonp(di.event.listener.push());
	});
};

module.exports = exports = FrontendRoute;
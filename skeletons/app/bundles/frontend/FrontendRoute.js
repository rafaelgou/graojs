var FrontendRoute = function (di) {
	
	di.graoExpress.get('/', function(req, res) {
    {% if template_engine == 'jade' %}
		res.render('frontend/view/index');
    {% if template_engine == 'swig' %}
      res.render('frontend/view/index.html');
    {% else %}
      // TODO Error
    {% endif %}
	});

};

module.exports = exports = FrontendRoute;
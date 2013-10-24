// Glocal Scope :)
var models, 
	controllers,
	event,
	{{ name | lower }}, // object
	{{ name | capitalize }}; // object/class

var service = {
		
	get : function(req, res) {
			{{ name | capitalize }}.findOne({_id : req.params.id}, function(err, {{ name | lower }}) {
			if (err)
			{
				event.newEvent(err).error().present().log('error');
				res.jsonp({{ name | lower }});
				res.end();
			}
		});
		
	},

	query : function(req, res) {
		
		{{ name | capitalize }}.find().sort('-created').populate('{{ name | lower }}').exec(function(err, {GRAO}{LOWER}{PLURAL}{NAME}) {
			if (err) {
				event.newEvent(err).error().present().log('error');
				res.end();
			} else {
				res.jsonp({GRAO}{LOWER}{PLURAL}{NAME});
				res.end();
			}
		});
	},

	create : function(req, res) {
		{{ name | lower }} = new {{ name | capitalize }}(req.body);
		{{ name | lower }}.save(function(err) {
			if (err) {
				event.newEvent(err).error().present().log('error');
			} else {
				event.newEvent('created').success().present().log('info');
			}
		});
		
		res.end();
	},

	update : function(req, res) {
		delete req.body._id;
		{{ name | capitalize }}.findOneAndUpdate({_id : req.params.id }, req.body, { upsert : true }, function(err, {{ name | lower }}) {
			if (err) {
				event.newEvent(err).error().present().log('error');
			} else {
				try {
					event.newEvent('updated').success().present().log('info');
				} catch(err) {
					event.newEvent(err).error().present().log('error');
				}
			}
		});
		res.end();
	},

	destroy : function(req, res) {	
		{{ name | capitalize }}.remove({_id : req.params.id}, function(err) {
			if (err) {
				event.newEvent(err).error().present().log('error');
			} else {
				event.newEvent('destroyed').success().present().log('info');
			}
		});
		res.end();
	}
};

var admin = {
	dashboard : function(req, res) {
		res.render('{{ name | lower }}/view/dashboard');
	}
};

var {{ name | capitalize }}Controller = function(di) {
	event = new di.event.newEvent('Instance created').success().present().log('info');
	
	models = di.models;
	controllers = di.controllers;
	{{ name | capitalize }} = models.{{ name | lower }}; // object/class
	{{ name | lower }} = new {{ name | capitalize }}(); // object
	this.service = service;
	this.admin = admin;
};

module.exports = exports = {{ name | capitalize }}Controller;
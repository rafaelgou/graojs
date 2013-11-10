// Glocal Scope :)
var models, 
	controllers,
	event,
	{{ schema | lower }}, // object
	{{ schema | capitalize }}; // object/class

var service = {
		
	get : function(req, res) {
			{{ schema | capitalize }}.findOne({_id : req.params.id}, function(err, {{ schema | lower }}) {
			if (err)
			{
				event.newEvent(err).error().present().log('error');
				res.jsonp({{ schema | lower }});
				res.end();
			}
		});
		
	},

	query : function(req, res) {
		
		{{ schema | capitalize }}.find().sort('-created').populate('{{ schema | lower }}').exec(function(err, {{ schema |  lower }}s) {
			if (err) {
				event.newEvent(err).error().present().log('error');
				res.end();
			} else {
				res.jsonp({{ schema |  lower }}s);
				res.end();
			}
		});
	},

	create : function(req, res) {
		{{ schema | lower }} = new {{ schema | capitalize }}(req.body);
		{{ schema | lower }}.save(function(err) {
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
		{{ schema | capitalize }}.findOneAndUpdate({_id : req.params.id }, req.body, { upsert : true }, function(err, {{ schema | lower }}) {
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
		{{ schema | capitalize }}.remove({_id : req.params.id}, function(err) {
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
		res.render('{{ schema | lower }}/view/dashboard');
	}
};

var {{ schema | capitalize }}Controller = function(di) {
	event = new di.event.newEvent('Instance created').success().present().log('info');
	
	models = di.models;
	controllers = di.controllers;
	{{ schema | capitalize }} = models.{{ schema | lower }}; // object/class
	{{ schema | lower }} = new {{ schema | capitalize }}(); // object
	this.service = service;
	this.admin = admin;
};

module.exports = exports = {{ schema | capitalize }}Controller;
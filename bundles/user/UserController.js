// Glocal Scope :)
var models, 
	controllers,
	logger,
	event,
	user, // object
	User; // object/class

var service = {

	get : function(req, res) {
		test = event.newEvent({
			name: 'kernel\.controllers\.service\.user\.get', 
			message: 'called'
		}).success().present().log('info');
		
		User.findOne({_id : req.params.id}, function(err, user) {
			if (err)
			{
				event.newEvent({
					name: 'kernel\.controllers\.service\.user\.get', 
					message: 'Error: '+err
				}).error().present().log('error');
				
				res.jsonp(user);
				res.end();
			}
		});
		
	},

	query : function(req, res) {
		
		event.newEvent({
			name: 'kernel\.controllers\.service\.user\.query', 
			message: 'called'
		}).success().present().log('info');
		
		User.find().sort('-created').populate('user').exec(function(err, users) {
			if (err) {
				
				event.newEvent({
					name: 'kernel\.controllers\.service\.user\.query', 
					message: 'Error: '+err
				}).error().present().log('error');
				
				res.end();
				//res.render('error', {status : 500});
			} else {
				
				res.jsonp(users);
				res.end();
				
			}
		});
	},

	create : function(req, res) {
		
		event.newEvent({
			name: 'kernel\.controllers\.service\.user\.create', 
			message: 'called.'
		}).success().present().log('info');
		
		user = new User(req.body);
		user.save(function(err) {
			if (err) {
				
				event.newEvent({
					name: 'kernel\.controllers\.service\.user\.create', 
					message: 'Errpr: '+err
				}).error().present().log('error');
				
			} else {
				
				event.newEvent({
					name: 'kernel\.controllers\.service\.user\.create', 
					message: 'Success created'
				}).success().present().log('info');
				
			}
		});
		
		res.end();
	},

	update : function(req, res) {
		event.newEvent({
			name: 'kernel\.controllers\.service\.user\.update', 
			message: 'called'
		}).success().present().log('info');
		
		//console.log(req.body); // {upsert: true} {new: true}
		delete req.body._id; // it's necessary findOneAndRemove
		User.findOneAndUpdate({_id : req.params.id }, req.body, { upsert : true }, function(err, user) {
			if (err) {
				
				event.newEvent({
					name: 'kernel\.controllers\.service\.user\.update', 
					message: err
				}).error().present().log('error');
				
			} else {
				try {
					//user.businessLogic1();
					//user.businessLogic2();
					
					console.log(user.businessLogic1()+user.businessLogic2());
					
					event.newEvent({
						name: 'kernel\.controllers\.service\.user\.update', 
						message: 'Success updated'
					}).success().present().log('info');
					
				} catch(err) {
					
					event.newEvent({
						name: 'kernel\.controllers\.service\.user\.update', 
						message: 'Exception: '+err
					}).error().present().log('error');
					
				}
			}
		});
		
		res.end();
	},

	destroy : function(req, res) {
		event.newEvent({
			name: 'kernel\.controllers\.service\.user\.destroy', 
			message: 'called'
		}).success().present().log('info');
		
		User.remove({_id : req.params.id}, function(err) {
			if (err) {
				
				event.newEvent({
					name: 'kernel\.controllers\.service\.user\.destroy', 
					message: 'Error: '+err
				}).error().present().log('error');
				
				//return handleError(err);
			} else {
				
				event.newEvent({
					name: 'kernel\.controllers\.service\.user\.destroy', 
					message: 'Success destroyed'
				}).success().present().log('info');
				
			}
		});
		
		res.end();
	}
};

var admin = {
	dashboard : function(req, res) {
		
		event.newEvent({
			name: 'kernel\.controllers\.admin\.dashboard', 
			message: 'called'
		}).success().present().log('info');
		
		res.render('user/view/dashboard');
	}
};

var UserController = function(di) {
	event = new di.event.newEvent({
				name: 'kernel\.controllers\.user', 
				message: 'Instance created'
	}).success().present().log('info');
	
	models = di.models;
	controllers = di.controllers;
	User = models.user; // object/class
	user = new User(); // object
	this.service = service;
	this.admin = admin;
};

module.exports = exports = UserController;
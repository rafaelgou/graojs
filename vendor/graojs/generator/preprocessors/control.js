exports.service = 
{		
		get : function(req, res)
		{
			{GRAO}{LOWER}{BUNDLE_NAME} = require("./model");
			{GRAO}{LOWER}{BUNDLE_NAME}.findOne({ _id: req.params.id }, function (err, {GRAO}{LOWER}{BUNDLE_NAME}) {
				  if (err) console.log("Error retrive");
				  res.jsonp({GRAO}{LOWER}{BUNDLE_NAME});
				});
		},
		
		query : function(req, res)
		{
			{GRAO}{LOWER}{BUNDLE_NAME} = require("./model");
			{GRAO}{LOWER}{BUNDLE_NAME}.find().sort('-created').populate('{GRAO}{LOWER}{BUNDLE_NAME}').exec(function(err, {GRAO}{LOWER}{PLURAL}{BUNDLE_NAME}) {
		        if (err) {
		            res.render('error', {
		                status: 500
		            });
		        } else {
		            res.jsonp({GRAO}{LOWER}{PLURAL}{BUNDLE_NAME});
		        }
		    });
		},
		
		create : function (req, res) 
		{
			//{GRAO}{LOWER}{BUNDLE_NAME} = require("../core/model").{GRAO}{LOWER}{BUNDLE_NAME};
			{GRAO}{LOWER}{BUNDLE_NAME} = require("./model");
			console.log(req.body);
			{GRAO}{LOWER}{BUNDLE_NAME} = new {GRAO}{LOWER}{BUNDLE_NAME}(req.body);
			{GRAO}{LOWER}{BUNDLE_NAME}.save(function (err)
		    {
			    if (!err) 
			    {
			    	return console.log("{GRAO}{LOWER}{BUNDLE_NAME}: "+{GRAO}{LOWER}{BUNDLE_NAME}.name+" created");
			    } 
			    else 
			    {
			    	return console.log(err);
			    }
			});
			return res.send({GRAO}{LOWER}{BUNDLE_NAME});
		},
		
		update : function (req, res) 
		{
			{GRAO}{LOWER}{BUNDLE_NAME} = require("./model");
			console.log('ID:'+req.params.id);
			console.log(req.body); // {upsert: true} {new: true}
			delete req.body._id; // it's necessary findOneAndRemove
			{GRAO}{LOWER}{BUNDLE_NAME}.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, function (err, {GRAO}{LOWER}{BUNDLE_NAME}){
				if(err)
					console.log(err);
				else
					console.log('Success update!');
			});
		},
		
		delete : function (req, res) 
		{
			{GRAO}{LOWER}{BUNDLE_NAME} = require("./model");
			{GRAO}{LOWER}{BUNDLE_NAME}.remove({ _id: req.params.id }, function (err) {
				  if (err) return handleError(err);
				  res.send({message: "Success delete!"});
			});
			console.log(req.params.id);
			
		}
};

exports.admin = 
{		
		dashboard : function(req, res)
		{
			res.render('{GRAO}{LOWER}{BUNDLE_NAME}/view/dashboard');		
		},
};
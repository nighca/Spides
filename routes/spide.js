
/*
 * GET slide.
 */

var dealJSON = require('../dealJSON');
var db = require('../db.js');

exports.list = function(req, res){
	var callback = {
		fail: function(err){
			res.render('list', { title: 'Public - Spides', error: err});
		},
		succeed: function(pub_slides){
			res.render('list', { title: 'Public - Spides', pub_slides: pub_slides});
		}
	};

	db.get_public(callback);
};

exports.verify = function(req, res){
	if(!req.params.id){
		res.render('verify', { title: 'Verify - Spides', id: "", name: null});
	}else{
		var id = req.params.id;
		var callback = {
			fail: function(err){
				res.send(err);
			},
			succeed: function(name){
				res.render('verify', { title: 'Verify - Spides', id: id, name: name});
			}
		};

		db.get_name(id, callback);
	}
};

exports.show = function(req, res){
	var id = req.body.id;

	var theKey = req.body.theKey;

	var callback = {
		fail: function(err){
			res.send(err);
		},
		succeed: function(content, name){
			spide = dealJSON.stringToJSON(content);
			res.render('spide', { title: name + ' - Spide', spide: spide });
		}
	};

	db.get(id, theKey, callback);
};

exports.new = function(req, res){
	res.render('new', { title: 'New - Spides'});
};

exports.create = function(req, res){
	var content = req.body.content;
	var theKey = req.body.theKey;
	var name = req.body.name;

	try{
    	eval("var temp=" + content);
    } catch(exception) {
    	console.log(content);
    	console.log(exception);
    	res.render('new', { title: 'New - Spides', error: "json语法错误 - "+exception, content:content});
    	return;
    }

	var callback = {
		fail: function(err){
			res.send(err);
		},
		succeed: function(id){
			res.redirect('/show/'+id);
		}
	};

	db.insert(content, name, theKey, callback);
};



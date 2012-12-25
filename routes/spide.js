
/*
 * GET slide.
 */

var dealJSON = require('../dealJSON');
var db = require('../db.js');

var adminKey = process.env.ADMINKEY || '123456';

exports.list = function(req, res){
	var callback = {
		fail: function(err){
			res.render('list', { title: 'Public - Spides', error: err});
		},
		succeed: function(slides){
			res.render('list', { title: 'Public - Spides', slides: slides});
		}
	};

	db.get_public(callback);
};

exports.admin_verify = function(req, res){
	res.render('admin_verify', { title: 'Admin - Spides'});
};

exports.admin_list = function(req, res){
	var Key = req.body.adminKey;

	if(Key != adminKey){
		res.render('admin_verify', {title: 'Admin - Spides', error: "Wrong Key!"});
	}else{
		var callback = {
			fail: function(err){
				res.render('admin_list', { title: 'Admin - Spides', error: err});
			},
			succeed: function(slides){
				res.render('admin_list', { title: 'Admin - Spides', slides: slides});
			}
		};

		db.get_all(callback);
	}
};

exports.verify = function(req, res){
	var target = req.path.split("/")[1];
	
	if(!req.params.id){
		res.render('verify', { title: 'Verify - Spides', target: target});
	}else{
		var id = req.params.id;
		var callback = {
			fail: function(err){
				res.render('verify', { title: 'Verify - Spides', target: target, error: err});
			},
			succeed: function(name){
				res.render('verify', { title: 'Verify - Spides', target: target, id: id, sname: name});
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
			res.render('verify', { title: 'Verify - Spides', target: "show", error: err});
		},
		succeed: function(content, name){
			var spide = dealJSON.jsonToHtml(dealJSON.stringToJSON(content));
			res.render('spide', { title: name + ' - Spide', id: id, spide: spide });
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
    	JSON.parse(content);
    } catch(exception) {
    	//console.log(content);
    	//console.log(exception);

    	res.render('new', { title: 'New - Spides', error: "json语法错误 - "+exception, content:content, sname: name});
    	return;
    }

	var callback = {
		fail: function(err){
    		res.render('new', { title: 'New - Spides', error: err, content:content,  sname: name});
		},
		succeed: function(id){
			res.redirect('/show/'+id);
		}
	};

	db.insert(content, name, theKey, callback);
};

exports.edit = function(req, res){
	var id = req.body.id;
	var theKey = req.body.theKey;

	var callback = {
		fail: function(err){
			res.render('verify', { title: 'Verify - Spides', target: "edit", error: err});
		},
		succeed: function(content, name){
			res.render('edit', { title: name + ' - Spide', id: id, content: content, name: name, theKey: theKey });
		}
	};

	db.get(id, theKey, callback);
};

exports.update = function(req, res){
	var id = req.body.id;
	var content = req.body.content;
	var theKey = req.body.theKey;
	var name = req.body.name;

	try{
    	JSON.parse(content);
    } catch(exception) {
    	//console.log(content);
    	//console.log(exception);

		res.render('edit', { title: name + ' - Spide', error: "json语法错误 - "+exception, id: id, content: content, name: name, theKey: theKey });
    	return;
    }

	var callback = {
		fail: function(err){
			res.render('edit', { title: name + ' - Spide', error: err, id: id, content: content, name: name, theKey: theKey });
		},
		succeed: function(message){
			res.redirect('/show/'+id);
		}
	};

	db.update(id, content, name, theKey, callback);
};

exports.delete = function(req, res){
	var isAjax = req.body.isAjax;
	if(isAjax){
		console.log("ajax");
		var id = req.body.id;
		var theKey = req.body.theKey;

		var callback = {
			fail: function(err){
				console.log(id, theKey, "fail");
				res.json({message: 'fail'});
			},
			succeed: function(){
				console.log(id, theKey, "succeed");
				res.json({message: 'succeed'});
			}
		};

		db.delete(id, theKey, callback);
	}else{
		var id = req.body.id;
		var theKey = req.body.theKey;

		var callback = {
			fail: function(err){
				res.redirect('/admin')
			},
			succeed: function(){
				res.render('admin_list', { title: 'Admin - Spides' });
			}
		};

		db.delete(id, theKey, callback);
	}
};




/*
 * GET home page.
 */

exports.index = function(req, res){
  	res.render('index', { title: 'Spides' });
};

exports.docs = function(req, res){
  	res.render('docs', { title: 'docs - Spides' });
};
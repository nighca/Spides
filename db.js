var _mysql = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'Spides';
var TABLE = 'spides';

var mysql = _mysql.createClient({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

var init = function(){
	mysql.query('create database ' + DATABASE + ';');
	mysql.query('use Spides;');
	mysql.query('create table ' + TABLE + '(id int NOT NULL auto_increment, content nvarchar(4000), name nvarchar(40), theKey varchar(20), primary key(id));');
};

mysql.query('use ' + DATABASE, function(err, results, fields){
	if(err){
		init();
    }
});



exports.insert = function(content, name, theKey, callback){
	mysql.query('use ' + DATABASE);

	content = escape(content);
	mysql.query('insert into ' + 
		TABLE +
		' (content, name, theKey) values ("' + 
		content + 
		'", "' + 
		name + 
		'", "' +
		theKey + 
		'")',function(err, results, fields) {
		    if(err){
		    	callback.fail(err);
		    }else{
		    	callback.succeed(results.insertId);
		    }
		});
};

exports.get_name = function(id, callback){
	mysql.query('use ' + DATABASE);

	mysql.query('select name from ' + TABLE + ' where id=' + id,
		function(err, results, fields) {
		    if (err){
		    	callback.fail(err);
		    }else {
		    	if(results.length < 1){
		    		callback.fail("Failed, no such record!");
		    	}else{
			        var col = results[0];
			        //console.log("get_name: result: ", results)
			        callback.succeed(col.name);
		    	}
		    }
		});
}

exports.get = function(id, theKey, callback){
	mysql.query('use ' + DATABASE);

	mysql.query('select * from ' + TABLE + ' where id=' + id,
		function(err, results, fields) {
		    if (err){
		    	callback.fail(err);
		    }else {
		    	if(results.length < 1){
		    		callback.fail("Failed, no such record!");
		    	}else{
			        var col = results[0];
			        if(theKey == col.theKey){
			        	callback.succeed(unescape(col.content), col.name);
			        }else{
			        	callback.fail("Failed, Wrong Key!");
			        }
		    	}
		    }
		});
}

exports.get_public = function(callback){
	mysql.query('use ' + DATABASE);

	mysql.query('select * from ' + TABLE + ' where theKey=""',
		function(err, results, fields) {
		    if (err){
		    	callback.fail(err);
		    }else {
		        callback.succeed(results);
		    }
		});
}
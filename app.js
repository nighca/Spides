
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , spide = require('./routes/spide')
  , http = require('http')
  , path = require('path')
  , db = require('./db');

//db.init();

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/docs', routes.docs);
app.get('/public', spide.list);

app.get('/show', spide.verify);
app.get('/show/:id', spide.verify);
app.post('/show', spide.show);

app.get('/create', spide.new);
app.post('/create', spide.create);

app.get('/edit', spide.verify);
app.get('/edit/:id', spide.verify);
app.post('/edit', spide.edit);
app.post('/update', spide.update);

app.post('/delete', spide.delete);

app.get('/admin', spide.admin_verify);
app.post('/admin', spide.admin_list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

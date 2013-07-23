var express = require('express'),
  app = express(),
  fs = require('fs'),
  stylus = require('stylus'),
  coffee = require('coffee-script');

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  //生产环境
  //app.set('env', 'production');
});

var router = JSON.parse(fs.readFileSync(__dirname + '/config/router.json', 'utf-8'));

//static files
if ('development' === app.get('env')) {

  app.get(/.css$/, function(req, res) {

    stylus(fs.readFileSync(__dirname + req.url.replace('.css', '.styl'), 'utf8'))
    .set('filename', __dirname + req.url)
    .render(function(err, css){
      if (err) throw err;
  	  res.set({
  	    'Content-Type': 'text/css',
  	    'Content-Length': css.length
  	  });
      res.send(css);
    });
    
  });

  app.get(/.js$/, function(req, res) {
      var js = coffee.compile(fs.readFileSync(__dirname + req.url.replace('.js', '.coffee'), 'utf8'));      
      res.set({
        'Content-Type': 'text/javascript',
        'Content-Length': js.length
      });
      res.send(js);
  });

}

app.get('*', function(req, res) {
  res.render(router[req.url] || '404');
});

app.listen('3000');
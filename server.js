var app = require('express')(),
  fs = require('fs');

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
});

var router = JSON.parse(fs.readFileSync('config/router.json', 'utf-8'));

app.get('*', function(req, res) {
  if (router[req.url]) {
  	res.render(router[req.url]);
  } else {
  	res.render('404');
  }
});

app.listen('3000');
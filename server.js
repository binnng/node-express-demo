var app = require('express')(),
	fs = require('fs');

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
});

app.get('/', function(req, res) {
	res.render('index', {
		title: '首页'
	});
});

app.get('*', function(req, res) {
	res.render('404');
});

app.listen('3000');
var express = require('express')
  , gzip = require('connect-gzip')
  , debugToolbar = require('../')
  , app = express.createServer();

app.use(debugToolbar.debugToolbar());

app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  res.render('common-usage.jade');
});

app.listen(3000);

console.log('Server listening on port 3000');
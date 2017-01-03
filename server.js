var express = require('express');
var app = express();
var bodyParser = require('body-parser');    // Pull information from HTML POST

// Mine
require('./routes.js')(app);

// Set Port
app.set('port', (process.env.PORT || 5000));

// Sets the directory to look in
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var http = require("http");

    
// redirect uundifined pages to 404
app.use(function(req, res) {
    res.redirect('/404');
});

// Listening on the port
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
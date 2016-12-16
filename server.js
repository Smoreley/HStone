var express = require('express');
var app = express();

var unirest = require('unirest');

require('./routes.js')(app);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var http = require("http");

app.get("/find", function(req, res) {
    
//    unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/{method}")
//    .routeParam("method", "cards")
//    .queryString("attack", "1")
//    .asJson();
    
//    .header("X-Mashape-Key", "tcTs13oTOtmshMiAuFHDilAXavp8p1Xgct2jsntz9DaRNlK8x0")
//    .end(function (result) {
//        console.log(result.status, result.headers, result.body);
//        res.send(result.body);
//    });
    
    unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards?attack=1")
    .header("X-Mashape-Key", "tcTs13oTOtmshMiAuFHDilAXavp8p1Xgct2jsntz9DaRNlK8x0")
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
//        res.send(result.body);
        res.render('display',{title:"404", info:result.body});
    });
});

// redirect uundifined pages to 404
app.use(function(req, res) {
    res.redirect('/404');
});



// 
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

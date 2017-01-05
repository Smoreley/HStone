module.exports = function(app) {
    // Unirest API needed to pull hearthstone data
    var unirest = require('unirest');
    var mashapeKey = "tcTs13oTOtmshMiAuFHDilAXavp8p1Xgct2jsntz9DaRNlK8x0";
    
    // Root page/Homepage
    app.get('/', function(req,res) {
        res.render('index', {title:"Homepage"});
    });
    
    // About Page
    app.get('/about', function(req,res) {
        res.render('about',{title:"About"});
    });
    
    app.get("/find", function(req, res) {
        var Request = unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
        .headers({
            'Accept': 'application/json',
            "X-Mashape-Key": mashapeKey
        })
        .query({
            "count": 1,
            "playerClass": "Priest",
            "cost": 2,
            "fields": "cardId"
        }).end(function(response, error) {
            var data = response.body;

            if(!error && response.statusCode == 200) {
                res.render('display',{title:"Finding", info:data});
            } else {
                console.log(data);
                console.log("\nERROR!");
            }

        });
    });
    
    // Unfound Page
    app.get('/404', function(req,res) {
        res.render('404',{title:"404"});
    });
    
    // Saerch for card by partial name
    app.post('/findcard', function(req,res) {
//        res.send("SuperData");
        
        var Request = unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/"+req.body.text)
        .headers({
            'Accept': 'application/json',
            "X-Mashape-Key": mashapeKey
        })
        .end(function(response, error) {
            var data = response.body;
            if(!error && response.statusCode == 200) {
                res.send(data);
            } else {
                console.log("\nERROR!");
                console.log(data);
                res.send({});
            }

        });
    });
    
    // Search for card by set
    app.post('/findcardbyset', function(req,res) {
        
        var Request = unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/{set}")
        .headers({
            'Accept': 'application/json',
            'X-Mashape-Key': mashapeKey
        })
        .end(function(response, error) {
            
        });
        
    });
}
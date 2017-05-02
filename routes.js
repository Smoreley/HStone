module.exports = function(app) {
    // Unirest API needed to pull hearthstone data
    var unirest = require('unirest');
    var mashapeKey = "tcTs13oTOtmshMiAuFHDilAXavp8p1Xgct2jsntz9DaRNlK8x0";
    
    // Root page/Homepage
    app.get('/', function(req,res) {
        res.render('index', {title:"HStone"});
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
    
    app.get("/test", function(req, res) {
        res.render('test',{title:"Test"});
    })
    
    // Unfound Page
    app.get('/404', function(req,res) {
        res.render('404',{title:"404"});
    });
    
    // Get info
    app.post('/getInfo', function(req,res) {
       var Request = unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/info")
       .headers({
           'Accept': 'application/json',
           'X-Mashape-Key': mashapeKey
       })
       .end(function(response, error) {
           var data = response.body;
           res.send(data);
       })
    });
    
    // Saerch for card by partial name
    app.post('/findCardByName', function(req,res) {        
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
    
    // Search for card by Classs
    app.post('/findCardByClass', function(req,res) {
        var queryInfo = {};
        queryParamCheck(req.body, queryInfo);
        
        var Request = unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/"+req.body.cardClass)
        .headers({
            'Accept': 'application/json',
            'X-Mashape-Key': mashapeKey
        })
        .query(queryInfo)
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
    
    // Search for card by Type
    app.post('/findCardByType', function(req,res) {
        // Query object that gets passed in the get request
        var queryInfo = {};
        queryParamCheck(req.body, queryInfo);
        
        var Request = unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/types/"+req.body.cardType)
        .headers({
            'Accept': 'application/json',
            'X-Mashape-Key': mashapeKey
        })
        .query(queryInfo)
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
    app.post('/findCardBySet', function(req,res) {
        var queryInfo = {};
        queryParamCheck(req.body, queryInfo);
        
        var Request = unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/"+req.body.cardSet)
        .headers({
            'Accept': 'application/json',
            'X-Mashape-Key': mashapeKey
        })
        .query(queryInfo)
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
}

// If values exit then add them to the query
function queryParamCheck(data, rtn) {
    if(data.cardCost) rtn.cost = data.cardCost;
    if(data.cardAttack) rtn.attack = data.cardAttack;
    if(data.cardHealth) rtn.health = data.cardHealth;
}
module.exports = function(app) {
    // Unirest API needed to pull hearthstone data
    var unirest = require('unirest');
    var mashapeKey = "tcTs13oTOtmshMiAuFHDilAXavp8p1Xgct2jsntz9DaRNlK8x0";
    
    app.get('/', function(req,res) {
        res.render('index', {title:"Homepage"});
    });
    
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

    //    unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/{method}")
    //    .routeParam("method", "cards")
    //    .queryString("attack", "1")
    //    .asJson();
    //    .header("X-Mashape-Key", "tcTs13oTOtmshMiAuFHDilAXavp8p1Xgct2jsntz9DaRNlK8x0")
    //    .end(function (result) {
    //        console.log(result.status, result.headers, result.body);
    //        res.send(result.body);
    //    });

    //    unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards?attack=1")
    //    .header("X-Mashape-Key", "tcTs13oTOtmshMiAuFHDilAXavp8p1Xgct2jsntz9DaRNlK8x0")
    //    .end(function (result) {
    //      console.log(result.status, result.headers, result.body);
    ////        res.send(result.body);
    //        res.render('display',{title:"404", info:result.body});
    //    });
    });

    app.get("/findByClass", function(req, res) {
        
        var searchParm = "fire";
        
        var Request = unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/"+searchParm)
        .headers({
            'Accept': 'application/json',
            "X-Mashape-Key": "tcTs13oTOtmshMiAuFHDilAXavp8p1Xgct2jsntz9DaRNlK8x0"
        })
        .end(function(response, error) {
            var data = response.body;

            if(!error && response.statusCode == 200) {
                res.render('showcard',{title:"Finding", info:data});
            } else {
                console.log(data);
                console.log("\nERROR!");
            }

        });
    });
    
    app.get('/404', function(req,res) {
        res.render('404',{title:"404"});
    });
}
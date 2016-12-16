module.exports = function(app) {
    app.get('/', function(req,res) {
        res.render('index', {title:"Homepage"});
    });
    
    app.get('/about', function(req,res) {
        res.render('about',{title:"About"});
    });
    
    app.get('/404', function(req,res) {
        res.render('404',{title:"404"});
    });
}
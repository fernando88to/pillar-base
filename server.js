var cc       = require('config-multipaas'),
    finalhandler= require('finalhandler'),
    http     = require("http"),
    Router       = require('router'),
    fs = require('fs'),
    serveStatic       = require("serve-static");

var config   = cc();
var app      = Router()

// Serve up public/ftp folder 
app.use(serveStatic('static'))

// Routes
app.get("/status", function (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end("{status: 'ok'}\n")
});



app.get("/servicos", function (req, res) {
    let servidores   =  {
        "servidores_cadastrados": [
            {"id":1,"nome":"GetUpCloud", "moeda":"real", "pagamentofixo":true,"periodoteste":true,"servidornobrasil":true,"cotagratuitaproducao":false, "url":"https://getupcloud.com/pt-br/precos/", "pontuacao":0},
            {"id":2,"nome":"Google APP Engine", "moeda":"real", "pagamentofixo":false,"periodoteste":true,"servidornobrasil":true,"cotagratuitaproducao":true, "url":"https://cloud.google.com/appengine/", "pontuacao":0},
            {"id":3,"nome":"Google firebase", "moeda":"real", "pagamentofixo":true,"periodoteste":true,"servidornobrasil":false,"cotagratuitaproducao":false, "url":"https://firebase.google.com/pricing/?hl=pt-br", "pontuacao":0},
            {"id":4,"nome":"Heroku", "moeda":"dolar", "pagamentofixo":true,"periodoteste":true,"servidornobrasil":false,"cotagratuitaproducao":false, "url":"https://www.heroku.com/pricing", "pontuacao":0},
            {"id":5,"nome":"Windows Azure Cloud", "moeda":"real", "pagamentofixo":false,"periodoteste":true,"servidornobrasil":true,"cotagratuitaproducao":false, "url":"https://azure.microsoft.com/pt-br/pricing/calculator/", "pontuacao":0},
            {"id":6,"nome":"AWS Lambda", "moeda":"dolar", "pagamentofixo":false,"periodoteste":true,"servidornobrasil":true,"cotagratuitaproducao":false, "url":"https://aws.amazon.com/pt/lambda/pricing/", "pontuacao":0}
        ]
    };
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(servidores));
})

app.get("/", function (req, res) {
  var index = fs.readFileSync(__dirname + '/index.html')
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(index.toString())
});

// Create server 
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  app(req, res, done)
})

server.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});

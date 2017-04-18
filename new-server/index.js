var express = require('express')
var app = express()
var bodyParser = require('body-parser');

// Middlewares ----------------------------------
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
// ----------------------------------------------


// Connection a mongoDB -------------------------
    var mongoose = require('mongoose')
    mongoose.Promise = require('q').Promise
    require('./models/models')
    mongoose.connect('mongodb://localhost/takro')
// ----------------------------------------------


// Fichiers statiques sous /build ----------------
    app.use(express.static(__dirname + '/build'))
// ----------------------------------------------


// Ajout des routes -----------------------------
    var authRoutes = require('./routes/auth/')
    var apiRoutes = require('./routes/api/')
    app.use('/auth', authRoutes)
    app.use('/api', apiRoutes)
// ----------------------------------------------


// Redirection sur l'index.html de React --------
    app.get('*', function(request, response) {
      response.sendFile(__dirname + '/build/index.html')
    })
// ---------------------------------------------



// Démarrage de l'application -------------------
  app.set('port', (process.env.PORT || 4000))
  app.listen(app.get('port'), function() {
    console.log("App running on port: ", app.get('port'))
  })
// ----------------------------------------------

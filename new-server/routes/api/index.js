
//fichier root de l'api
var router = require('express').Router();

// ajout des routes
var documentsRoutes = require('./documents/')
var usersRoutes = require('./users/')
router.use('/docs', documentsRoutes);
router.use('/users', usersRoutes);

module.exports = router

var router = require('express').Router()
var fileUpload = require('express-fileupload')
var controller = require('./functions')

// middlewares --------------------------------------
    router.use(fileUpload()) // upload de fichier
// --------------------------------------------------

/*============================================================
 | Routes des documents
 *------------------------------------------------------------*/

/*===========+
 | /api/docs |
 +-----------*/
router.route('/')

  // retourne la liste de tout les documents
  .get(controller.getAllDocuments)

  // upload un documents
  .post(controller.uploadDocument)



module.exports = router

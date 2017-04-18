
var router = require('express').Router();

/*============================================================
 | Routes des documents
 *------------------------------------------------------------*/
router.route('/login')
  .get((req, res) => {
    res.json({"status": "connected"})
  })

module.exports = router;

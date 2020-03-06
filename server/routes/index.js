 const express = require('express');
 const router = express.Router();



 router.use(require('./busquedas'));
router.use(require('./entrada'));
router.use(require('./usuarios'));
router.use(require('./login'));
router.use(require('./upload'));
module.exports =  router;
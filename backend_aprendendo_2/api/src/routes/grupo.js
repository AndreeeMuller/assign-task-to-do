const router = require('express-promise-router')();
const controller = require('../controllers/grupo');

router.post('/grupo', controller.create);
router.get('/grupo', controller.getAll);

module.exports = router;
const router = require('express-promise-router')()
const controller = require('../controllers/grupo')

router.get('/grupo', controller.getAll)
router.get('/grupo/:idgrupo', controller.getByIdGrupo)
router.post('/grupo', controller.create)
router.put('/grupo/:idgrupo', controller.update)
router.delete('/grupo/:idgrupo', controller.delete)

module.exports = router
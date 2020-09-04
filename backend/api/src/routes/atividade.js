const router = require('express-promise-router')()
const controller = require('../controllers/atividade')

router.get('/atividade', controller.getAll)
router.get('/atividade/:idatividade', controller.getByIdAtividade)
router.get('/atividade/avaiable/:idgrupo', controller.getAvaiableByIdGrupo)
router.post('/atividade', controller.create)
router.put('/atividade/:idatividade', controller.update)
router.delete('/atividade/:idatividade', controller.delete)

module.exports = router
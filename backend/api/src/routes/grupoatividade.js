const router = require('express-promise-router')()
const controller = require('../controllers/grupoatividade')

router.get('/grupo/atividade', controller.getAll)
router.get('/grupo/atividade/:idgrupoatividade', controller.getByIdGrupoAtividade)
router.get('/grupo/:idgrupo/atividade', controller.getByIdGrupo)

module.exports = router
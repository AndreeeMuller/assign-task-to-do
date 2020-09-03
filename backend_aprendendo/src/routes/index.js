const { Router } = require('express')
const router = Router()
const { getUsers, createUser, getUserById, deleteUser, updateUser } = require('../controllers/index.controller')

router.get('/v1/users', getUsers)
router.get('/v1/users/:id', getUserById)
router.post('/v1/users', createUser)
router.put('/v1/users/:id', updateUser)
router.delete('/v1/users/:id', deleteUser)

module.exports = router
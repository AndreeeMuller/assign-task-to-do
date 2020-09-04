const express = require('express')
const cors = require('cors')
const app = express()

// middlewares (Executa antes da rota)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// routes
const index = require('./routes/index')
const rAtividade = require('./routes/atividade')
const rGrupo = require('./routes/grupo')
const rGrupoAtividade = require('./routes/grupoatividade')

app.use(index)
app.use('/api/v1/', rAtividade)
app.use('/api/v1/', rGrupo)
app.use('/api/v1/', rGrupoAtividade)

module.exports = app;
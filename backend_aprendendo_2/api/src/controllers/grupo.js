const db = require('../config/database');

exports.getAll = async (req, res) => {
  const response = await db.query('Select * From grupo g Order by g.descricao')
  res.status(200).send(response.rows)
}

exports.create = async (req, res) => {
  const idusuario = 1
  const { descricao, tipoagenda } = req.body

  const response = await db.query(
    'insert into grupo (idusuario, descricao, tipoagenda) values ($1, $2, $3)',
    [ idusuario, descricao, tipoagenda ]
  )

  res.status(201).send({
    message: 'Grupo gravado com sucesso!',
    body: {
      grupo: {
        idusuario,
        descricao,
        tipoagenda
      }
    }
  })
}

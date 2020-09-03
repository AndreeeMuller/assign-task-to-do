const db = require('../config/database')

exports.getAll = async (req, res) => {

  const response = await db.query('Select * From grupo g Order by g.descricao')

  res.status(200).send(response.rows)

}

exports.getByIdGrupo = async (req, res) => {

  const { idgrupo } = req.params

  const response = await db.query('Select * From grupo g Where g.idgrupo = $1 Order by g.descricao', [ idgrupo ])

  res.status(200).send(response.rows)

}

exports.create = async (req, res) => {

  const { descricao, tipoagenda } = req.body
  
  const idusuario = 1

  const response = await db.query(
    'insert into grupo (idusuario, descricao, tipoagenda) values ($1, $2, $3) returning idgrupo',
    [ idusuario, descricao, tipoagenda ]
  )

  res.status(201).send({
    message: 'Grupo gravado com sucesso!',
    body: {
      grupo: {
        idgrupo: response.rows[0].idgrupo,
        idusuario,
        descricao,
        tipoagenda
      }
    }
  })

}

exports.update = async (req, res) => {

  const { idgrupo } = req.params
  const { descricao, tipoagenda } = req.body
  
  const idusuario = 1

  const response = await db.query(
    'update grupo set descricao = $1, tipoagenda = $2',
    [ descricao, tipoagenda ]
  )

  res.status(200).send({
    message: 'Grupo atualizado com sucesso!',
    body: {
      grupo: {
        idusuario,
        descricao,
        tipoagenda
      }
    }
  })

}

exports.delete = async (req, res) => {

  const { idgrupo } = req.params

  const response = await db.query(
    'delete from grupo where idgrupo = $1',
    [ idgrupo ]
  )

  res.status(200).send({
    error: false,
    message: 'Grupo removido com sucesso!',
    body: {
      grupo: {
        idgrupo
      }
    }
  })

}

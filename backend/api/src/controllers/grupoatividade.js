const db = require('../config/database')

exports.getAll = async (req, res) => {

  const response = await db.query('Select * From grupoativiade ga Order by ga.titulo')

  res.status(200).send(response.rows)

}

exports.getByIdGrupo = async (req, res) => {

  const { idgrupo } = req.params

  const response = await db.query('Select * From grupoatividade ga Where ga.idgrupo = $1 Order by ga.titulo', [ idgrupo ])

  res.status(200).send(response.rows)

}

exports.getByIdGrupoAtividade = async (req, res) => {

  const { idgrupoatividade } = req.params

  const response = await db.query('Select * From grupoatividade ga Where ga.idgrupoatividade = $1 Order by ga.titulo', [ idgrupoatividade ])

  res.status(200).send(response.rows)

}

exports.create = async (req, res) => {

  const { idgrupo } = req.params

  const { idatividade } = req.body

  console.log(idatividade)

  const response = await db.query(
    'insert into grupoatividade (idgrupo, idatividade, titulo, descricao, niveldificuldade, qtdmaxatividadeseguidausuario, permitetroca) Select $1 as idgrupo, a.idatividade, a.titulo, a.descricao, a.niveldificuldade, a.qtdmaxatividadeseguidausuario, a.permitetroca From atividade a Where a.idatividade = any($2::int[])',
    [ idgrupo, idatividade ]
  )

  console.log(response)

  res.status(201).send({
    message: 'Grupo Atividade gravado com sucesso!',
  })

}

exports.delete = async (req, res) => {

  const { idgrupoatividade } = req.params

  const response = await db.query(
    'delete from grupoatividade where idgrupoatividade = $1',
    [ idgrupoatividade ]
  )

  res.status(200).send({
    error: false,
    message: 'Grupo Atividade removido com sucesso!',
    body: {
      grupoatividade: {
        idgrupoatividade
      }
    }
  })

}
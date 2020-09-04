const db = require('../config/database')

exports.getAll = async (req, res) => {

  const response = await db.query('Select * From atividade a Order by a.titulo')

  res.status(200).send(response.rows)

}

exports.getByIdAtividade = async (req, res) => {

  const { idatividade } = req.params

  const response = await db.query('Select * From atividade a Where a.idatividade = $1 Order by a.titulo', [ idatividade ])

  res.status(200).send(response.rows)

}

exports.getAvaiableByIdGrupo = async (req, res) => {

  const { idgrupo } = req.params

  const response = await db.query('Select * From atividade a Where not exists (Select NULL From grupoatividade ga Where ga.idatividade = a.idatividade and ga.idgrupo = $1) Order by a.titulo', [ idgrupo ])

  res.status(200).send(response.rows)

}

exports.create = async (req, res) => {

  const { 
    titulo,
    descricao,
    niveldificuldade,
    qtdmaxatividadeseguidausuario,
    permitetroca
  } = req.body
  
  const idusuario = 1

  const response = await db.query(
    'insert into atividade (idusuario, titulo, descricao, niveldificuldade, qtdmaxatividadeseguidausuario, permitetroca) values ($1, $2, $3, $4, $5, $6) returning idatividade',
    [ idusuario, titulo, descricao, niveldificuldade, qtdmaxatividadeseguidausuario, permitetroca ]
  )

  res.status(201).send({
    message: 'Atividade gravada com sucesso!',
    body: {
      atividade: {
        idatividade: response.rows[0].idatividade,
        titulo,
        descricao,
        niveldificuldade,
        qtdmaxatividadeseguidausuario,
        permitetroca
      }
    }
  })

}

exports.update = async (req, res) => {

  const { idatividade } = req.params

  const { 
    titulo,
    descricao,
    niveldificuldade,
    qtdmaxatividadeseguidausuario,
    permitetroca
  } = req.body
  
  const idusuario = 1

  const response = await db.query(
    'update atividade set titulo = $1, descricao = $2, niveldificuldade = $3, qtdmaxatividadeseguidausuario = $4, permitetroca = $5 where idatividade = $6',
    [ titulo, descricao, niveldificuldade, qtdmaxatividadeseguidausuario, permitetroca, idatividade ]
  )

  res.status(200).send({
    message: 'Atividade atualizada com sucesso!',
    body: {
      atividade: {
        idatividade,
        titulo,
        descricao,
        niveldificuldade,
        qtdmaxatividadeseguidausuario,
        permitetroca
      }
    }
  })

}

exports.delete = async (req, res) => {

  const { idatividade } = req.params

  const response = await db.query(
    'delete from atividade where idatividade = $1',
    [ idatividade ]
  )

  res.status(200).send({
    error: false,
    message: 'Atividade removida com sucesso!',
    body: {
      atividade: {
        idatividade
      }
    }
  })

}

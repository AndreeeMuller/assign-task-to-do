const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'A1n5d9r3E5',
    database: 'firstapi',
    port: '5432'
})

const getUsers = async (req, res) => {
    const response = await pool.query('Select * From users')
    res.status(200).json(response.rows)
}

const getUserById = async (req, res) => {
    const { id } = req.params

    const response = await pool.query('Select * From users Where id = $1', [ id ])

    res.status(200).json(response.rows)
}

const createUser = async (req, res) => {
    const { name, email } = req.body

    const response = await pool.query('insert into users (name, email) values ($1, $2)', [ name, email ])

    res.json({
        message: 'Usuário gravado com sucesso!',
        body: {
            user: {
                name,
                email
            }
        }
    })
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    const response = await pool.query('update users set name = $1, email = $2 where id = $3', [ name, email, id ])

    res.json({
        message: 'Usuário atualizado com sucesso!',
        body: {
            user: {
                id,
                name,
                email
            }
        }
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    const response = await pool.query('delete from users where id = $1', [ id ])

    res.json({
        message: 'Usuário excluído com sucesso!',
        body: {
            user: {
                id
            }
        }
    })
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}
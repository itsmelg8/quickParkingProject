const pool = require('../conexao');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(401).json({ mensagem: 'O campo nome não foi informado!'});
    };

    if (!email) {
        return res.status(401).json({ mensagem: 'O campo email não foi informado!'});
    };

    if (!senha) {
        return res.status(401).json({ mensagem: 'O campo senha não foi informado!'});
    };

    try {
        const queryClienteEmail = 'select * from usuarios where email = $1'
		const emailExistente = await pool.query(queryClienteEmail, [email]);

		if (emailExistente.rowCount > 0) {
			return res
				.status(400).json({ mensagem: 'E-mail informado já está cadastrado' });
		};

        const senhaCriptografada = await bcrypt.hash(senha, 10);

		const novoUsuario = await pool.query(
			'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
			[nome, email, senhaCriptografada]
		);

		return res.status(201).json(novoUsuario.rows[0]);

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};
};

module.exports = cadastrarUsuario;
const pool = require('../conexao');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')

const login = async (req, res) => {
	const { email, senha } = req.body

    if (!email) {
        return res.status(401).json({ mensagem: 'O campo email não foi informado!'});
    };

    if (!senha) {
        return res.status(401).json({ mensagem: 'O campo senha não foi informado!'});
    };

	try {
		const usuario = await pool.query(
			'select * from usuarios where email = $1',
			[email]
		);

		if (usuario.rowCount < 1) {
			return res.status(404).json({ mensagem: 'Email invalido' });
		};

		const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

		if (!senhaValida) {
			return res.status(400).json({ mensagem: 'Senha invalida' })
		};

		const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
			expiresIn: '8h',
		});

		const { senha: _, ...usuarioLogado } = usuario.rows[0]

		return res.json({ usuario: usuarioLogado, token });

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};

};

module.exports = login;
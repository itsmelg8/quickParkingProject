const pool = require('../conexao');

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
		const novoUsuario = await pool.query(
			'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
			[nome, email, senha]
		);

		return res.status(201).json(novoUsuario.rows[0]);

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};
};

module.exports = cadastrarUsuario;
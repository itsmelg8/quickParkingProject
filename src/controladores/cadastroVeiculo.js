const pool = require('../conexao');

const cadastrarVeiculo = async (req, res) => {
    const { placa, marca, modelo, cor } = req.body;

    if (!placa) {
        return res.status(401).json({ mensagem: 'O campo placa não foi informado!'});
    };

    if (!marca) {
        return res.status(401).json({ mensagem: 'O campo marca não foi informado!'});
    };

    if (!modelo) {
        return res.status(401).json({ mensagem: 'O campo modelo não foi informado!'});
    };

    if (!cor) {
        return res.status(401).json({ mensagem: 'O campo cor não foi informado!'});
    };

    try {
		const novoVeiculo = await pool.query(
			'insert into veiculo (placa, marca, modelo, cor) values ($1, $2, $3, $4) returning *',
			[placa, marca, modelo, cor]
		);

		return res.status(201).json(novoVeiculo.rows[0]);

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};
};

module.exports = cadastrarVeiculo;
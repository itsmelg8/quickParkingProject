const pool = require('../conexao');

const reserva = async (req, res) => {
    const { placa, horario } = req.body;

    if (!placa) {
        return res.status(401).json({ mensagem: 'O campo placa não foi informado!'});
    };

    if (!horario) {
        return res.status(401).json({ mensagem: 'O campo horario não foi informado!'});
    };

    try {
		const { rows } = await pool.query(
			'insert into reserva (placa, horario) values ($1, $2) returning *',
			[placa, horario]
		);

		return res.status(201).json(rows[0]);

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' });
	};
};

module.exports = reserva;
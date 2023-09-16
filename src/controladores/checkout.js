const pool = require('../conexao');

const checkout = async (req, res) => {
    const { placa } = req.body;

    try {
		const { rows, rowCount } = await pool.query(
			'select * from reserva where placa = $1',
			[placa]
		);
            
        if (rowCount < 1) {
			return res.status(404).json({ mensagem: 'Carro não encontrado' });
		};

        await pool.query('delete from reserva where placa = $1', [placa]);

        return res.status(204).send(rows);

	} catch (error) {
		return res.status(500).json('Erro interno do servidor');
	};

};

module.exports = checkout;
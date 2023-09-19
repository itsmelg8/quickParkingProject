const pool = require('../conexao');

const horarioAtual = new Date();

const checkout = async (req, res) => {
    const { placa } = req.body;

	if (!placa) {
        return res.status(401).json({ mensagem: 'O campo placa não foi informado!'});
    };

    try {
		const placaVeiculo = 'select * from reserva where placa = $1'
		const placaExistente = await pool.query(placaVeiculo, [placa]);

		const horarioConsulta = 'select horario from reserva where placa = $1'
		const horarioEntrada = await pool.query(horarioConsulta, [placa]);


		if (placaExistente.rowCount < 1) {
			return res.status(400).json({ mensagem: 'Carro informado não está estacionado' });
		};

		const { horario } = horarioEntrada.rows[0];

		const partes = horario.split(" - ");

		const hora = partes[0];
		const data = partes[1];

		const [dia, mes, ano] = data.split("/");

		const [horas, minutos] = hora.split(":");

		const dataHoraDesejada = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(horas), parseInt(minutos));

		const diferencaEmMilissegundos = horarioAtual - dataHoraDesejada;

		const horasPassadas = Math.floor((diferencaEmMilissegundos / (1000 * 60 * 60)) * 5);

		//console.log(horasPassadas);

        await pool.query('delete from reserva where placa = $1', [placa]);

        return res.status(204).json(horasPassadas);

	} catch (error) {
		return res.status(500).json('Erro interno do servidor');
	};

};

module.exports = checkout;
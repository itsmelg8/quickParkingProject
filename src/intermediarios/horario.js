const { horario } = require('../controladores/reserva')

const partes = horario.split(" - ");

const horario = partes[0];
const data = partes[1];

const [dia, mes, ano] = data.split("/");

const [horas, minutos] = horario.split(":");

const dataHoraReserva = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(horas), parseInt(minutos));

module.exports = dataHoraReserva;
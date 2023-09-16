const express = require('express');

const cadastroUsuario = require('./controladores/cadastrarUsuario.js');
const login = require('./controladores/login.js');
const cadastrarVeiculo = require('./controladores/cadastroVeiculo.js');
const reserva = require('./controladores/reserva.js');
const checkout = require('./controladores/checkout.js');

const rotas = express();

rotas.post('/cadastro', cadastroUsuario);
rotas.post('/login', login);
rotas.post('/cadastroVeiculo', cadastrarVeiculo);
rotas.post('/reserva', reserva);
rotas.delete('/checkout', checkout);

module.exports = rotas;

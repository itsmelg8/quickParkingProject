const express = require('express');

const cadastroUsuario = require('./controladores/cadastrarUsuario.js');
const login = require('./controladores/login.js');
const cadastrarVeiculo = require('./controladores/cadastroVeiculo.js');

const rotas = express();

rotas.post('/cadastro', cadastroUsuario);
rotas.post('/login', login);
rotas.post('/cadastroVeiculo', cadastrarVeiculo);

module.exports = rotas;

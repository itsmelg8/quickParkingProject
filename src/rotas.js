const express = require('express');

const cadastroUsuario = require('./controladores/cadastrarUsuario.js');
const login = require('./controladores/login.js');

const rotas = express();

rotas.post('/cadastro', cadastroUsuario);
rotas.post('/login', login);

module.exports = rotas;
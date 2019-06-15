// Importando o express que permite lidar com rotas, parâmetros e respostas
const express = require('express');
// Importando o mongoose (biblioteca para criar e manipular dados no mongo)
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Criando aplicação
// A função express() cria um servidor
const app = express();

// Garante suporte ao protocolo http
const server = require('http').Server(app);
// Garante suporte ao protocolo WebSocket que permite a comunicação em tempo real
const io = require('socket.io')(server);

// Conexão com o banco de dados (mongo)
mongoose.connect('mongodb+srv://semana:semana@cluster0-rixmv.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// Repassa a informação do io para todas as rotas,
// garantindo acesso do req.io a todos os controllers
app.use((req, res, next) => {
  req.io = io;

  next();
});

// Permitir o acesso de diferentes IPs, de diferentes servidores possam acessar esse backend
// Sem isso o React não conseguiria acessar a aplicação
app.use(cors());

// Rota para acessar arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// Declara outro arquivo para tratar as rotas da aplicação
app.use(require('./routes'));

// Define a porta para acessar o servidor pelo navegador
server.listen(3333);

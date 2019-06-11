const express = require('express');
const multer = require('multer');   // Permite que o express entenda o corpo da requisição post no formato 'Multipart'
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index); // Retorna todos os Posts do feed
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);   // Rota para realizar likes

module.exports = routes;
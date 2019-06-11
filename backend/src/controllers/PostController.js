const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    // Retorna todos os posts ordenados pelo campo createdAt de forma decrescente
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;  // Recebe o restante dos dados
        const { filename: image } = req.file;   // Recebe dados do arquivo

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        // Redimensiona a imagem e converte para jpg
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        // Delete o arquivo original
        fs.unlinkSync(req.file.path);

        // Salva dentro do BD
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        // Envia informação em tempo real através do io com nome 'post' e todos os dados desse post que está sendo feito
        req.io.emit('post', post);

        return res.json(post);
    }
}
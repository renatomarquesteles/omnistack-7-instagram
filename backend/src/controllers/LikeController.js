const Post = require('../models/Post');

module.exports = {
    async store(req, res) {
        // Busca o post pelo id que foi passado como parâmetro
        const post = await Post.findById(req.params.id);

        // Adiciona 1 like
        post.likes += 1;

        await post.save();

        // Envia informação em tempo real através do io com nome 'post' e todos os dados desse post que está sendo feito
        req.io.emit('like', post); // Avisa os usuários conectados que tem um novo like em tempo real

        return res.json(post);
    }
};
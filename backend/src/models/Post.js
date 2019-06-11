const mongoose = require('mongoose');

// Definir quais colunas estão disponíveis dentro da tabela do BD
// Representação da tabela do BD em formato JS
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    imagem: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,   // Anotará em cada campo de cada registro "created at" e "updated at"
});

module.exports = mongoose.model('Post', PostSchema);
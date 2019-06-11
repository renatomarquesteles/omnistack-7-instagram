const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),    // Define para onde os arquivos vão
        filename: function(req, file, callback) {
            callback(null, file.originalname);  // Define o nome do arquivo para utilizar o nome original do arquivo
        }
    })
};
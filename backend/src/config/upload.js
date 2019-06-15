const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'), // Define para onde os arquivos vão
    filename(req, file, callback) {
      // Define o nome do arquivo para utilizar o nome original do arquivo
      callback(null, file.originalname);
    },
  }),
};

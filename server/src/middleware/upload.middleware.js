const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "--" + file.originalname)
    }
  })

const multerFilter = (req, file, cb) => {
    if ((file.mimetype).includes('pdf')) {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
  };

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

module.exports = upload.single('file');

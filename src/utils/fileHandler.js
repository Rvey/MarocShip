const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './src/');
    },
    filename: (req, file, callBack) => {
        const ext = file.mimetype.split('/')[1];
        callBack(null, `uploads/candidates-driver-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, callBack) => {
    if (file.mimetype.split("/")[1] === "pdf") {
        callBack(null, true);
    } else {
        callBack(new Error("Not a PDF File!!"), false);
    }
  };

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

module.exports = upload;

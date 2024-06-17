const multer = require('multer');

exports.uploadMiddleware = (filesPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, filesPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage }).single('file');

  return (req, res, next) => {
    upload(req, res, (err) => {

      if (err) {
        return next(err);
      }
      next();
    });
  }
}

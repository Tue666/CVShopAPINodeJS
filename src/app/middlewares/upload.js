const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        // will insert even if file existed
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, uniqueSuffix + '-' + file.originalname)
        
        // will not insert if file existed
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only images allowed'), false);
    }
};

module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4
    },
    fileFilter: fileFilter
});
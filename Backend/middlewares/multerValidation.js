const multer=require('multer');

// multer middleware for handling files
const storage=multer.memoryStorage();

const multerUploads=multer({storage}).single('image');

module.exports={multerUploads};
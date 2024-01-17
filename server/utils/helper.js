import multer from "multer";
const storage = multer.diskStorage({});

// control which image file type to upload
const imageFileFilter = (req, file, cb) => {
   if (!file.mimetype.startsWith("image")) {
      cb("Only image Files are supported", false);
   }
   cb(null, true);
};

export const upload = multer({ storage, fileFilter: imageFileFilter });

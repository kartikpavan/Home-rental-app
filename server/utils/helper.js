import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads/"); // store uplaoded file in the upload folder
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

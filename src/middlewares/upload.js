import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/temp");
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .replaceAll(" ", "_")
      .replace(/(.+)(\.[a-zA-Z0-9]+)$/, `$1-${Date.now()}$2`);
    console.log(file.mimetype);
    callback(null, name);
  },
});

const upload = multer({ storage: storage }).single("picture");

export default upload;

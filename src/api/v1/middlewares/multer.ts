import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});
export const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".webp"
    ) {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
  limits: { fileSize: 3000000 },
});

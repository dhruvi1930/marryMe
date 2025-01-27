import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "public/uploads");
  },
  filename: function (req, file, callBack) {
    callBack(null, new Date().toISOString + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    callBack(null, true);
  } else ({ error: "Unsupported file format" }), false;
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

export default upload;

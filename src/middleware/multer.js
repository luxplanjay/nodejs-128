import multer from "multer";

// Додає req.file
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      // все погано це не підходить
      return callback(new Error("Invalid file type!"));
    }

    // все добре, це підходить
    callback(null, true);
  },
});

// ✅ callback(null, true)
// ⚠️ callback(null, false)
// ❌ callback(new Error("help help"))

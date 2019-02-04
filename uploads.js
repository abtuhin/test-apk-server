const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./apks/");
  },
  filename: function(req, file, cb) {
    cb(null, "ShopUp_eLoan.apk");
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/vnd.android.package-archive") {
    cb(null, true);
  } else {
    cb(new Error("Not Apk file"), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
module.exports = {
  upload: upload
};

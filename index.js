const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
var cors = require("cors");
const util = require("util");
const uploads = require("./uploads");
const ApkReader = require("adbkit-apkreader");

app.use(cors());
app.use(express.static(__dirname + "/apks"));

// get apk version
app.get("/apk/:appName", (req, res) => {
  ApkReader.open("apks/" + req.params.appName)
    .then(reader => reader.readManifest())
    .then(manifest => {
      let obj = util.inspect(manifest, { depth: null });
      res.send({
        versionCode: manifest.versionCode,
        versionName: manifest.versionName,
        package: manifest.package,
        link: req.params.appName
      });
    });
});

// download apk
app.get("/:link/", function(req, res) {
  res.send(req.params.link);
});

// upload apk
app.post("/apk/upload", uploads.upload.single("ShopUp_eLoan"), (req, res) => {
  if (req.file) {
    console.log("Uploading file...");
    var filename = req.file.filename;
    var uploadStatus = "File Uploaded Successfully";
  } else {
    var filename = "FILE NOT UPLOADED";
    var uploadStatus = "File Upload Failed";
  }

  res.send({
    upload: true
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

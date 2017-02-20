var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE
});

var db = admin.database();
var ref = db.ref("/");

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
});
var s3 = new AWS.S3();

require('date-utils');
var dt = new Date();
var formatted = dt.toFormat("YYYYMMDDHH24MISS");
var filename = formatted + "_data.json.gz";

var fs = require("fs");
var zlib = require('zlib');
ref.once("value", function (snapshot) {
  zlib.gzip(JSON.stringify(snapshot.val()), function (err, binary) {
    var params = { Bucket: process.env.BUCKET, Key: filename, Body: binary };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log("Successfully uploaded data to S3");
        process.exit();
      }
    });
  });
});

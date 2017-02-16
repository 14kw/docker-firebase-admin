var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  }),
  databaseURL: process.env.DATABASE_URL
});
var db = admin.database();
var ref = db.ref("/");

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.REGION
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
      } else {
        console.log("Successfully uploaded data to S3");
      }
    });
  });
});
process.exit();

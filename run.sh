#!/bin/bash
aws s3 cp s3://web-aws-test/firebase-database-backup/serviceAccountKey.json /opt/docker-firebase-admin/serviceAccountKey.json
cd /opt/docker-firebase-admin
node app.js
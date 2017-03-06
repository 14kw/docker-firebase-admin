#!/bin/bash
aws s3 cp s3://${BUCKET}/serviceAccountKey.json /opt/docker-firebase-admin/serviceAccountKey.json
cd /opt/docker-firebase-admin
node app.js
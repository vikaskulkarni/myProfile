#!/bin/bash
echo “DELETING OLD FILES…”
aws s3 rm s3://profile-app-deployment/ --recursive
aws s3 cp dist/ s3://profile-app-deployment/ --recursive
echo “UPLOADING NEW FILES…”

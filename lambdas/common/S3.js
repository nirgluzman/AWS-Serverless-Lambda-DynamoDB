const AWS = require('aws-sdk');

// Create S3 service object
const s3Client = new AWS.S3();

const S3 = {
  get(bucket, fileName) {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };
    return s3Client.getObject(params).promise();
  },

  write(bucket, fileName, data) {
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: JSON.stringify(data),
    };
    return s3Client.putObject(params).promise();
  },
};

module.exports = S3;

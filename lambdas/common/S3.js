const AWS = require('aws-sdk');

// Create S3 service object
const s3Client = new AWS.S3();

const S3 = {
  // https://jamesgalley.com/how-to-use-s3-getobject-as-a-promise-in-node-js
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
  get(bucket, fileName) {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };
    return s3Client.getObject(params).promise();
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
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

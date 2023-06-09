const Responses = require('../common/API_Responses');

const S3 = require('../common/S3');

const bucket = process.env.bucketName;

exports.handler = async (event) => {
  console.log('event', event);

  const { fileName } = event.pathParameters;

  if (!fileName) {
    // failed without a fileName
    return Responses._400({
      message: 'missing fileName in the path parameters',
    });
  }

  const data = JSON.parse(event.body);

  try {
    const newData = await S3.write(bucket, fileName, data);

    if (!newData) {
      return Responses._400({ message: 'failed to write data by fileName' });
    }

    return Responses._200(newData);
  } catch (err) {
    console.log('error in S3 WRITE', err);
    return Responses._500({ message: err.message });
  }
};

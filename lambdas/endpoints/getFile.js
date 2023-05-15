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

  try {
    const file = await S3.get(bucket, fileName);

    if (!file) {
      return Responses._400({ message: 'failed to get data by fileName' });
    }

    const data = JSON.parse(file.Body.toString());

    return Responses._200(data);
  } catch (err) {
    console.log('error in S3 GET', err);
    return Responses._500({ message: err.message });
  }
};

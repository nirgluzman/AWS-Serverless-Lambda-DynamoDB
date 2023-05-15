const AWS = require('aws-sdk');
const SES = new AWS.SES();

const Responses = require('../common/API_Responses');

exports.handler = async (event) => {
  console.log('event', event);

  const { to, from, subject, text } = JSON.parse(event.body);

  if (!to || !from || !subject || !text) {
    Responses._400({
      message: 'to, from, subject and text are required in the body',
    });
  }

  const params = {
    Source: from,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Text: { Data: text },
      },
    },
  };

  try {
    await SES.sendEmail(params).promise();
    return Responses._200({ message: 'Email was sent!' });
  } catch (err) {
    console.log('error sending Email', err);
    return Responses._400({ message: err.message });
  }
};

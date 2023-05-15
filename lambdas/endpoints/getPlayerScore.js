const Responses = require('../common/API_Responses');

const DynamoDB = require('../common/DynamoDB');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || event.pathParameters.ID === 0) {
    // failed without an ID
    return Responses._400({ message: 'missing the ID from the path' });
  }

  const { ID } = event.pathParameters;

  try {
    const user = await DynamoDB.get(tableName, ID);

    if (JSON.stringify(user) === '{}') {
      return Responses._400({ message: 'failed to get user by ID' });
    }

    return Responses._200(user.Item);
  } catch (err) {
    console.log('error in DynamoDB GET', err);
    return Responses._500({ message: err.message });
  }
};

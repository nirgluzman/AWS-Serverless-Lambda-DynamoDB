const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const DynamoDB = {
  // https://dynobase.dev/dynamodb-nodejs/#get-item
  get(TableName, ID) {
    const params = {
      TableName,
      Key: { ID },
    };
    return ddb.get(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#put-item
  write(TableName, user) {
    const params = {
      TableName,
      Item: user,
    };
    return ddb.put(params).promise();
  },
};

module.exports = DynamoDB;

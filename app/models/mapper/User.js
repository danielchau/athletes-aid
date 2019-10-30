const { DynamoDbSchema, DynamoDbTable } = require('@aws/dynamodb-data-mapper');
const { v4 } = require('uuid');

class User {}

Object.defineProperties(User.prototype, {
  [DynamoDbTable]: {
    value: 'Users',
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: 'String',
        keyType: 'HASH',
        defaultProvider: v4,
      },
      email: { type: 'String' },
      password: { type: 'String' },
      userType: {type: 'String'}
    },
  },
});

module.exports = {User};

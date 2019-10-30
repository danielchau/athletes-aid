const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");
const { v4 } = require("uuid");

class InjuryReports {}

Object.defineProperties(User.prototype, {
  [DynamoDbTable]: {
    value: "InjuryReports"
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: "String",
        keyType: "HASH",
        defaultProvider: v4
      },
      createdAt: {
        type: "Date",
        keyType: "RANGE"
      },
      createdBy: {
        type: "String"
      },
      athlete: {
        type: "String"
      },
      description: { type: "String"}
    }
  }
});

module.exports = {InjuryReports};

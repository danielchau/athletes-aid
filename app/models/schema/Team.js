const { DynamoDbSchema, DynamoDbTable } = require("@aws/dynamodb-data-mapper");
const { v4 } = require("uuid");

class Team {}

Object.defineProperties(Team.prototype, {
  [DynamoDbTable]: {
    value: "Teams"
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: "String",
        keyType: "HASH",
        defaultProvider: v4
      },
      name: {
        type: "String"
      },
      athletes: {
        type: "List",
        memberType: {
          type: "String"
        }
      }
    }
  }
});

module.exports = { Team };

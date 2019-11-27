import { DataMapper } from "@aws/dynamodb-data-mapper";
import * as AWS from "aws-sdk";
import { config } from "../config/aws.config";

AWS.config.update(config);
const client = new AWS.DynamoDB();
const mapper = new DataMapper({ client });

export default mapper;

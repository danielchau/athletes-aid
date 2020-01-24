import * as AWS from "aws-sdk";
import { config } from "../config/aws.config";

AWS.config.update(config);
const s3 = new AWS.S3();

export default s3;

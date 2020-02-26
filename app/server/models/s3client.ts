import AWS from "aws-sdk";
import { config } from "../config/aws.config";

export class S3Client {
  protected client: AWS.S3;

  constructor() {
    AWS.config.update(config);
    this.client = new AWS.S3();
  }

  public async put(
    request: AWS.S3.Types.PutObjectRequest
  ): Promise<AWS.S3.Types.PutObjectOutput> {
    return new Promise((resolve, reject) => {
      this.client.putObject(request, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data);
      });
    });
  }

  public async get(
    request: AWS.S3.Types.GetObjectRequest
  ): Promise<AWS.S3.Types.GetObjectOutput> {
    return new Promise((resolve, reject) => {
      this.client.getObject(request, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data);
      });
    });
  }
}

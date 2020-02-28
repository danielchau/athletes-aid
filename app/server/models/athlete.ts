import { Athlete } from "./schema/Athlete";
import mapper from "./mapper";
import { S3Client } from "./s3client";

import { Logger } from "@overnightjs/logger";
import { loggerModeArr } from "@overnightjs/logger/lib/constants";
import { GetObjectResponse } from "aws-sdk/clients/mediastoredata";

import path from "path";

import * as fs from "fs";

export async function postAthlete(athlete: Athlete): Promise<string> {
  return mapper.put(athlete).then((data: Athlete) => {
    return data.id;
  });
}

export async function getAthlete(athleteId: string): Promise<Athlete> {
  return mapper
    .get(Object.assign(new Athlete(), { id: athleteId }))
    .then((athlete: Athlete) => {
      return athlete;
    });
}

/**
 * Update athlete info
 *
 * @param {Athlete} athlete The id of the athlete to update
 * @return {Athlete} the updated athlete info
 */
export async function updateAthlete(athlete: Athlete): Promise<Athlete> {
  return mapper.update(athlete).then(data => {
    return data;
  });
}

export async function getAllAthletes(): Promise<Array<Athlete>> {
  let athletes = new Array<Athlete>();
  for await (const entry of mapper.scan(Athlete)) {
    athletes.push(entry);
  }
  return athletes;
}

export type fileReturn = {
  tag: string;
  filePath: string;
};

export async function postFile(
  file: Express.Multer.File,
  userId: string
): Promise<fileReturn> {
  const s3Client = new S3Client();
  let fileName = `${userId}/${Date.now()}-${file.originalname}`;

  const s3PutRequest: AWS.S3.Types.PutObjectRequest = {
    Bucket: "athletes-aid-user-files",
    Key: fileName,
    Body: file.buffer
  };

  const s3Response = await s3Client.put(s3PutRequest);

  let athlete = await getAthlete(userId);

  if (!athlete.availableFiles) {
    athlete.availableFiles = Array<String>();
  }
  athlete.availableFiles.push(fileName);

  mapper.update(athlete);

  return { tag: s3Response.ETag, filePath: fileName };
}

export async function getFile(key: string, userId: string): Promise<string> {
  const s3Client = new S3Client();

  let fileName = `${userId}/${key}`

  const s3GetRequest: AWS.S3.Types.GetObjectRequest = {
    Bucket: "athletes-aid-user-files",
    Key: fileName
  };
  const s3Response = await s3Client.get(s3GetRequest);

  let keyArray = key.split("/");
  key = keyArray[keyArray.length - 1];

  const DIST_DIR = path.join(__dirname, "../../dist"); // NEW
  let fileLocation = path.join(DIST_DIR, key); // NEW

  fs.writeFileSync(fileLocation, s3Response.Body);

  return fileLocation;
}

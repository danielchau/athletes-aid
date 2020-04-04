import { Athlete } from "./schema/Athlete";
import mapper from "./mapper";
import { S3Client } from "./s3client";

import path from "path";

import * as fs from "fs";


/**
 * Add an athlete to the database
 *
 * @param {Athlete} athlete the athlete object
 * @return {string} the id of the athlete
 */
export async function postAthlete(athlete: Athlete): Promise<string> {
  return mapper.put(athlete).then((data: Athlete) => {
    return data.id;
  });
}

/**
 * Get an athlete from the database
 *
 * @param {string} athleteID The id of the athlete to get
 * @return {Athlete} the athlete object
 */
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

/**
 * Gets all athletes from the database
 *
 * @return {Array<Athlete>} the athlete object
 */
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

/**
 * Adds a file to S3
 *
 * @param {Express.Multer.File} file the file to add
 * @param {string} userId id of the athlete
 * @return {fileReturn} A file return object
 */
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

/**
 * Gets a file to S3
 *
 * @param {string} key key of the file to retrieve 
 * @param {string} userId id of the athlete
 * @return {string} the location of the file
 */
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

/**
 * Deletes a file from S3
 *
 * @param {string} key key of the file to delete 
 * @param {string} userId id of the athlete
 */
export async function deleteFile(key: string, userId: string): Promise<any> {
  const s3Client = new S3Client();

  let fileName = `${userId}/${key}`

  const s3DeleteRequest: AWS.S3.Types.DeleteObjectRequest = {
    Bucket: "athletes-aid-user-files",
    Key: fileName
  };
  await s3Client.delete(s3DeleteRequest);

  let athlete = await getAthlete(userId);
  athlete.availableFiles = athlete.availableFiles.filter(e => e !== fileName);
  mapper.update(athlete);

}

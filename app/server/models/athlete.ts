import { Athlete } from "./schema/Athlete";
import mapper from "./mapper";

import s3 from "./s3upload";
import * as multer from "multer";
import * as multerS3 from "multer-s3";
import { Logger } from "@overnightjs/logger";
import { loggerModeArr } from "@overnightjs/logger/lib/constants";

export async function postAthlete(athlete: Athlete): Promise<string> {
  return mapper.put(athlete).then((data: Athlete) => {
    return data.id;
  });
}

export async function getAthlete(athleteId: string): Promise<Athlete> {
  return mapper
    .get(Object.assign(new Athlete(), { id: athleteId }))
    .then((athlete: Athlete) => {
      console.log(athlete);
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

  
export const upload = (req: any, res: any, next: (error: any) => void) => {
  console.log(req.body);

  multer
    .default({
      storage: multerS3.default({
        s3: s3,
        bucket: "athletes-aid-user-files",
        key: function(req, file, cb) {
          cb(null, `${Date.now().toString()} - ${file.originalname}`);
        }
      })
    })
    .array("upload", 1);
};

export async function retrieveFile(filename: string, res: Response) {
  const getParams = {
    Bucket: "athletes-aid-user-files",
    Key: filename
  };

  s3.getObject(getParams, function(err, data) {
    if (err) {
      return res.status(400).send({ success: false, err: err });
    } else {
      return res.send(data.Body);
    }
  });
}

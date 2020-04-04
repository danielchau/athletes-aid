import { Request, Response } from "express";
import { Athlete } from "../models/schema/Athlete";

import { Logger } from "@overnightjs/logger";

import * as athleteModel from "../models/athlete";
import * as injuryModel from "../models/injury";

import * as fs from "fs";

/**
 * POST Request: Adds a new athlete to the data base
 * @return {res} The id of the new athlete
 */
export const postAthlete = async (req: Request, res: Response) => {
  Logger.Info(req);

  try {
    const athlete = Object.assign(new Athlete(), {
      createdBy: req.body.createdBy,

      firstName: req.body.firstName,

      lastName: req.body.lastName,

      birthDate: req.body.birthDate,

      yearInSchool: req.body.yearInSchool,

      gender: req.body.gender,

      weight: req.body.weight,

      height: req.body.height,

      email: req.body.email,

      cellPhone: req.body.cellPhone,

      homePhone: req.body.homePhone,

      address: req.body.address,

      emailNotifications: req.body.emailNotifications,

      textNotifications: req.body.textNotifications,

      healthPlan: req.body.healthPlan,

      memberId: req.body.memberId,

      groupNumber: req.body.groupNumber,

      provincialHealthCardNumber: req.body.provincialHealthCardNumber,

      studentNumber: req.body.studentNumber,

      province: req.body.province,

      primaryPhysician: req.body.primaryPhysician,

      emergencyContact: req.body.emergencyContact,

      injuries: req.body.injuries,

      teams: req.body.teams
    });
    let id: string = await athleteModel.postAthlete(athlete);

    let response = {
      message: "Athlete Created",
      data: {
        id: id
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to create athlete");
  }
};

/**
 * GET Request: Adds a new athlete to the data base
 * @return {res} The athlete and associated injuries
 */
export const getAthlete = async (req: Request, res: Response) => {
  try {
    let athlete = new Athlete();
    athlete = await athleteModel.getAthlete(req.query.athleteId);

    let injuries = [];
    for (var iid of athlete.injuries) {
      let i = await injuryModel.getInjury(iid);
      injuries.push(i);
    }

    let response = {
      message: "Athlete found",
      data: {
        athlete: {
          ...athlete,
          injuries: injuries
        }
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get athlete");
  }
};

/**
 * PUT Request: Updates an existing athlete
 * @return {res} The updated athlete object
 */
export const putAthlete = async (req: Request, res: Response) => {
  Logger.Info(req);

  try {
    const athlete = Object.assign(new Athlete(), {
      id: req.body.id,

      createdBy: req.body.createdBy,

      firstName: req.body.firstName,

      lastName: req.body.lastName,

      birthDate: req.body.birthDate,

      yearInSchool: req.body.yearInSchool,

      gender: req.body.gender,

      weight: req.body.weight,

      height: req.body.height,

      email: req.body.email,

      cellPhone: req.body.cellPhone,

      homePhone: req.body.homePhone,

      address: req.body.address,

      emailNotifications: req.body.emailNotifications,

      textNotifications: req.body.textNotifications,

      healthPlan: req.body.healthPlan,

      memberId: req.body.memberId,

      groupNumber: req.body.groupNumber,

      provincialHealthCardNumber: req.body.provincialHealthCardNumber,

      studentNumber: req.body.studentNumber,

      province: req.body.province,

      primaryPhysician: req.body.primaryPhysician,

      emergencyContact: req.body.emergencyContact,

      injuries: req.body.injuries,

      teams: req.body.teams
    });
    let updatedAthlete: Athlete = await athleteModel.updateAthlete(athlete);

    let response = {
      message: "Athlete Updated",
      data: updatedAthlete
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to update athlete");
  }
};

/**
 * GET Request: Gets all athletes in the database
 * @return {res} Data object containing all athlete objects
 */
export const getAllAthletes = async (req: Request, res: Response) => {
  try {
    let athletes = new Array<Athlete>();
    athletes = await athleteModel.getAllAthletes();

    let response = {
      message: "All athletes",
      data: {
        athletes: athletes
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get athletes");
  }
};

/**
 * POST Request: Adds a file to an athletes profile
 * @return {res} returnFile data object
 */
export const postFile = async (req: Request, res: Response) => {
  Logger.Info(req);

  try {
    let returnFile: athleteModel.fileReturn = await athleteModel.postFile(
      req.file,
      req.body.userId
    );

    let response = {
      message: "File Uploaded",
      data: returnFile
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e, true);
    return res.status(500).send("Failed to upload file");
  }
};

/**
 * GET Request: Adds a new athlete to the data base
 * @return {res} The id of the new athlete
 */
export const getFile = async (req: Request, res: Response) => {
  try {
    let fileLocation = await athleteModel.getFile(
      req.query.key,
      req.query.userId
    );

    return res.download(fileLocation, () => {
      fs.unlink(fileLocation, err => {
        if (err) throw err;
      });
    });
  } catch (e) {
    Logger.Info(e, true);
    return res.status(500).send("Failed to get file");
  }
};

/**
 * DELETE Request: deletes an athlete from the database
 * @return {res} delete message
 */
export const deleteFile = async (req: Request, res: Response) => {
  try {
    await athleteModel.deleteFile(req.query.key, req.query.userId);

    let response = {
      message: "File Deleted"
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e, true);
    return res.status(500).send("Failed to get file");
  }
};

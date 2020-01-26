import { Request, Response } from "express";
import { Athlete } from "../models/schema/Athlete";

import { Logger } from "@overnightjs/logger";

import * as athleteModel from "../models/athlete";

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

      province: req.body.province,

      primaryPhysician: req.body.primaryPhysician,

      emergencyContact: req.body.emergencyContact,

      injuries: req.body.injuries,

      teams: req.body.teams
    });
    let id: string = await athleteModel.putAthlete(athlete);

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

export const getAthlete = async (req: Request, res: Response) => {
  try {
    let athlete = new Athlete();
    athlete = await athleteModel.getAthlete(req.query.athleteId);

    let response = {
      message: "Athlete found",
      data: {
        athlete: athlete
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get athlete");
  }
};

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

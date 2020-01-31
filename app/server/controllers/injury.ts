import { Request, Response } from "express";
import { Injury, InjuryNote } from "../models/schema/Injury";

import { Athlete } from "../models/schema/Athlete";

import { Logger } from "@overnightjs/logger";

import * as injuryModel from "../models/injury";
import * as athleteModel from "../models/athlete";

export const postInjury = async (req: Request, res: Response) => {
  Logger.Info(req);
  try {
    const injury = Object.assign(new Injury(), {
      createdBy: req.body.createdBy,

      active: req.body.active,

      teamName: req.body.teamName,

      teamId: req.body.teamId,

      athleteName: req.body.athleteName,

      athleteId: req.body.athleteId,

      injuryDate: req.body.injuryDate,

      isSportsRelated: req.body.isSportsRelated,

      eventType: req.body.eventType,

      position: req.body.position,

      sideOfBody: req.body.sideOfBody,

      locationOnBody: req.body.locationOnBody,

      injuryType: req.body.injuryType,

      severity: req.body.severity,

      status: req.body.status,

      mechanism: req.body.mechanism,

      injuryDescription: req.body.injuryDescription
    });

    let id: string = await injuryModel.putInjury(injury);

    let athlete: Athlete = await athleteModel.getAthlete(req.body.athleteId);

    if (!athlete.injuries) {
      athlete.injuries = Array<string>();
    }

    athlete.injuries.push(id);

    athlete = await athleteModel.updateAthlete(athlete);

    let response = {
      message: "Injury Created",
      data: {
        injuryId: id
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to create injury");
  }
};

export const getInjuriesByRange = async (req: Request, res: Response) => {
  try {
    let injuries = new Array<Injury>();
    injuries = await injuryModel.getInjuriesByRange(
      req.query.startDate,
      req.query.endDate,
      req.query.teamId
    );

    let response = {
      message: "Injuries By date and team",
      data: {
        injuries
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get injuries in range");
  }
};

export const postInjuryNote = async (req: Request, res: Response) => {
  try {
    const injuryNote = Object.assign(new InjuryNote(), {
      createdBy: req.body.createdBy,
      content: req.body.content
    });

    let injury: Injury = await injuryModel.addInjuryNote(
      injuryNote,
      req.body.injuryId
    );

    let response = {
      message: "Injury Note Added",
      data: {
        injury: injury
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to add note");
  }
};

export const getInjury = async (req: Request, res: Response) => {
  try {
    let injury = new Injury();
    injury = await injuryModel.getInjury(req.query.injuryId);

    let response = {
      message: "Injury found",
      data: {
        injury: injury
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get Injury");
  }
};

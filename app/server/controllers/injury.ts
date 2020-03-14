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

export const updateInjury = async (req: Request, res: Response) => {
  Logger.Info(req);
  try {
    let injury: Injury = await injuryModel.getInjury(req.body.injuryId);

    if (req.body)
      injury.createdBy =
        req.body.createdBy != undefined ? req.body.createdBy : injury.createdBy;

    injury.active =
      req.body.active != undefined ? req.body.active : injury.active;

    injury.teamName =
      req.body.teamName != undefined ? req.body.teamName : injury.teamName;

    injury.teamId =
      req.body.teamId != undefined ? req.body.teamId : injury.teamId;

    injury.athleteName =
      req.body.athleteName != undefined
        ? req.body.athleteName
        : injury.athleteName;

    injury.athleteId =
      req.body.athleteId != undefined ? req.body.athleteId : injury.athleteId;

    injury.injuryDate =
      req.body.injuryDate != undefined ? req.body.injuryDate : injury.injuryDate;

    injury.isSportsRelated =
      req.body.isSportsRelated != undefined
        ? req.body.isSportsRelated
        : injury.isSportsRelated;

    injury.eventType =
      req.body.eventType != undefined ? req.body.eventType : injury.eventType;

    injury.position =
      req.body.position != undefined ? req.body.position : injury.position;

    injury.sideOfBody =
      req.body.sideOfBody != undefined
        ? req.body.sideOfBody
        : injury.sideOfBody;

    injury.locationOnBody =
      req.body.locationOnBody != undefined
        ? req.body.locationOnBody
        : injury.locationOnBody;

    injury.injuryType =
      req.body.injuryType != undefined
        ? req.body.injuryType
        : injury.injuryType;

    injury.severity =
      req.body.severity != undefined ? req.body.severity : injury.severity;

    injury.status =
      req.body.status != undefined ? req.body.status : injury.status;

    injury.mechanism =
      req.body.mechanism != undefined ? req.body.mechanism : injury.mechanism;

    injury.injuryDescription =
      req.body.injuryDescription != undefined
        ? req.body.injuryDescription
        : injury.injuryDescription;

    let updatedInjury: Injury = await injuryModel.updateInjury(injury);

    let response = {
      message: "Injury Updated",
      data: {
        injury: updatedInjury
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to update injury");
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

export const postInjurySpecialNote = async (req: Request, res: Response) => {
    try {
        const injuryNote = Object.assign(new InjuryNote(), {
            createdBy: req.body.createdBy,
            content: req.body.content
        });

        let injury: Injury = await injuryModel.addInjurySpecialNote(injuryNote, req.body.injuryId);

        let response = {
            message: "Injury Special Note Added",
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

export const setActive = async (req: Request, res: Response) => {
  try {
    let injury = new Injury();
    injury = await injuryModel.getInjury(req.body.injuryId);

    injury.active = req.body.active;
    injury = await injuryModel.updateInjury(injury);

    let response = {
      message: "Injury active status updated",
      data: {
        injury: injury
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to update Injury");
  }
};

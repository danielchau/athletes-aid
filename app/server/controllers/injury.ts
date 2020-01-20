import { Request, Response } from "express";
import { Injury } from "../models/schema/Injury";

import { Logger } from "@overnightjs/logger";

import * as injuryModel from "../models/injury";

export const postInjury = async (req: Request, res: Response) => {
  Logger.Info(req);
  try {
    const injury = Object.assign(new Injury(), {
      createdBy: req.body.createdBy,

      active: req.body.active,

      teamName: req.body.teamName,

      athleteName: req.body.athleteName,

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
      req.query.teamName
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

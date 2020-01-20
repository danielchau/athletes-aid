import { Request, Response } from "express";
import { Team } from "../models/schema/Team";

import { Logger } from "@overnightjs/logger";

import * as teamModel from "../models/team";

export const postTeam = async (req: Request, res: Response) => {
  try {
    const team = Object.assign(new Team(), {
      createdBy: req.body.createdBy,
      name: req.body.teamName,
      season: req.body.season,
      athletes: req.body.athletes || []
    });

    let id: string = await teamModel.putTeam(team);

    let response = {
      message: "Team Created",
      data: {
        teamId: id
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to create team");
  }
};

export const modifyTeam = async (req: Request, res: Response) => {
  try {
    let id: string = await teamModel.updateTeam(
      req.body.teamId,
      req.body.athletes,
      req.body.season,
      req.body.teamName
    );

    let response = {
      message: "Team Updated",
      data: {
        teamId: id
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Unable to update team");
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    let team = new Team();
    team = await teamModel.getTeam(req.query.teamId);

    let response = {
      message: "Team found",
      data: {
        team
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get injuries in range");
  }
};

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    let teams = new Array<Team>();
    teams = await teamModel.getAllTeams();

    let response = {
      message: "All Teams",
      data: {
        teams
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get injuries in range");
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    await teamModel.deleteTeam(req.body.teamId);

    let response = {
      message: "Team deleted"
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to delete team");
  }
};

import { Request, Response } from "express";
import { Team } from "../models/schema/Team";
import { Logger } from "@overnightjs/logger";

import { Athlete } from "../models/schema/Athlete";
import * as teamModel from "../models/team";
import * as athleteModel from "../models/athlete";

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
    let athletes = new Array<Athlete>();

    team = await teamModel.getTeam(req.query.teamId);

    for (var id of team.athletes) {
      let athlete = await athleteModel.getAthlete(id);
      athletes.push(athlete);
    }

    let response = {
      message: "Team found",
      data: {
        team,
        athletes
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get team");
  }
};

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    let teams = new Array<Team>();
    teams = await teamModel.getAllTeams();

    let teamAthletes = new Map();

    for (var team of teams) {
      let athletes = [];
      for (var id of team.athletes) {
        let a = await athleteModel.getAthlete(id);
        athletes.push(a);
      }
      teamAthletes.set(team.id, athletes);
    }

    let teamOutput = teams.map(t => ({
      id: t.id,
      name: t.name,
      season: t.season,
      athletes: teamAthletes.get(t.id)
    }));

    console.log(teamOutput);
    let response = {
      message: "All Teams",
      data: {
        teamOutput
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get all teams");
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

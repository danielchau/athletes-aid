import { Request, Response } from "express";
import { Team } from "../models/schema/Team";
import { Logger } from "@overnightjs/logger";

import { Athlete } from "../models/schema/Athlete";
import * as teamModel from "../models/team";
import * as athleteModel from "../models/athlete";

/**
 * POST Request: Creates a new team
 * @return {res} The Id of the new team
 */
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

/**
 * PUT Request: Updates an existing team
 * @return {res} The id of the team
 */
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

/**
 * GET Request: Gets a team from the database
 * @return {res} A data object containing the team object and associated athlete objects
 */
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

/**
 * GET Request: Gets all teams in the database
 * @return {res} Data object containing all teams
 */
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    let teams = new Array<Team>();
    teams = await teamModel.getAllTeams();

    let teamOutput = teams.map(t => ({
      id: t.id,
      name: t.name,
      season: t.season,
      athletes: t.athletes
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

/**
 * Delete Request: Deletes an existing team from the database
 * @return {res} delete message
 */
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

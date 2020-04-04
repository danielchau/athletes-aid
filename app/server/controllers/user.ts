import { Request, Response } from "express";
import { User } from "../models/schema/User";
import { Team } from "../models/schema/Team";

import { Logger } from "@overnightjs/logger";

import * as teamModel from "../models/team";
import * as userModel from "../models/user";

/**
 * POST Request: Creates a new user
 * @return {res} The cwl of the new user
 */
export const postUser = async (req: Request, res: Response) => {
  try {
    const user = Object.assign(new User(), {
      cwl: req.body.cwl,
      role: req.body.role,
      teams: req.body.teams || []
    });

    let cwl: string = await userModel.putUser(user);

    let response = {
      message: "User Created",
      data: {
        cwl: cwl
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to create User");
  }
};

/**
 * Get Request: gets a user from the database
 * @return {res} The user object
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    let user = new User();

    user = await userModel.getUser(req.session.passport.user.cwl);

    let response = {
      message: "User found",
      data: {
        user: user
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get User");
  }
};

/**
 * GET Request: Gets a users related teams
 * @return {res} Data object containing all the teams
 */
export const getUserTeams = async (req: Request, res: Response) => {
  try {
    let user = new User();

    user = await userModel.getUser(req.session.passport.user.cwl);

    let teams = new Array<Team>();
    for (var teamId of user.teams) {
      let team = await teamModel.getTeam(teamId);
      teams.push(team);
    }

    let teamOutput = teams.map(t => ({
      id: t.id,
      name: t.name,
      season: t.season,
      athletes: t.athletes
    }));

    let response = {
      message: "Teams for user found",
      data: {
        teamOutput
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get teams for user");
  }
};

/**
 * POST Request: Updates the teams of an existing user
 * @return {res} Data object containing array of teams
 */
export const postUserTeams = async (req: Request, res: Response) => {
  try {
    let user: User = await userModel.getUser(req.body.cwl);

    user.teams = req.body.teams;
    await userModel.updateUser(user);

    let response = {
      message: "User teams updated",
      data: {
        teams: user.teams
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Unable to update teams for user");
  }
};

/**
 * POST Request: Changes the role of a user
 * @return {res} the updated role of a user
 */
export const postRole = async (req: Request, res: Response) => {
  try {
    let user: User = await userModel.getUser(req.body.cwl);

    user.role = req.body.role;
    await userModel.updateUser(user);

    let response = {
      message: "User role updated",
      data: {
        role: user.role
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Unable to update role for user");
  }
};

/**
 * DELETE Request: Deletes a user from the database
 * @return {res} Delete message
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userModel.deleteUser(req.body.cwl);
    let response = {
      message: "User Deleted"
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Unable to delete user");
  }
};

/**
 * GET Request: Gets all the users in the database
 * @return {res} A data object containing all the users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    let users = new Array<User>();
    users = await userModel.getAllUsers();

    let response = {
      message: "All users",
      data: {
        users: users
      }
    };
    res.json(response);
  } catch (e) {
    Logger.Info(e);
    return res.status(500).send("Failed to get all Users");
  }
};

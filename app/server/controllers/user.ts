import { Request, Response } from "express";
import { User } from "../models/schema/User";

import { Logger } from "@overnightjs/logger";

import * as userModel from "../models/user";

/**
 * Deletes a User from DynamoDB
 *
 * @param {string} cwl  The CWL ID of the user
 */

export const postUser = async (req: Request, res: Response) => {
    try {
      const user = Object.assign(new User(), {
        cwl: req.body.cwl,
        role: req.body.role,
        teams: req.body.teams || []
      });
  
      let cwl: string = await userModel.createUniqueUser(user);
  
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
 * Gets a User from DynamoDB
 *
 * @param {string} cwl  The CWL ID of the user
 */

export const getUser = async (req: Request, res: Response) => {
    try {
      let user = new User();
      //@ts-ignore
      user = await userModel.getUser(req.user.cwl);
  
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

  export const postUserTeams = async (req: Request, res: Response) => {
    try {
      let user: User = await userModel.getUser(
        req.body.cwl
      );
    
      user.teams = req.body.teams  
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

  export const postRole = async (req: Request, res: Response) => {
    try {
      let user: User = await userModel.getUser(
        req.body.cwl
      );
    
      user.role = req.body.role  
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

  export const deleteUser = async (req: Request, res: Response) => {
    try {
      await userModel.deleteUser(req.body.cwl);
      let response = {
        message: "User Deleted",
      };
      res.json(response);
    } catch (e) {
      Logger.Info(e);
      return res.status(500).send("Unable to delete user");
    }
  };

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




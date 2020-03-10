import { UserPermissions } from "./permissions";

/**
 * Constants for types of actions available for Redux Reducers.
 */
export const TOGGLE_NAVIGATION_PANEL = "TOGGLE_NAVIGATION_PANEL";
export const SET_SELECTED_TEAM = "SET_SELECTED_TEAM";
export const SET_SELECTED_ATHLETE = "SET_SELECTED_ATHLETE";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_CURRENT_ROSTER = "GET_CURRENT_ROSTER";
export const GET_TEAMS = "GET_TEAMS";
export const GET_ATHLETE_INJURIES = "GET_ATHLETE_INJURIES";
export const SET_STARTING_DATE = "SET_STARTING_DATE";
export const SET_ENDING_DATE = "SET_ENDING_DATE";

export enum NavigationPanelStates {
    open,
    closed
}

/**
 * Interfaces for Redux Reducers.
 */

export type NavigationPanelTypes = ToggleNavAction;
interface ToggleNavAction {
    type: typeof TOGGLE_NAVIGATION_PANEL;
    state: NavigationPanelStates;
}

export type SetSelectedTeamTypes = SetSelectedTeam;
interface SetSelectedTeam {
    type: typeof SET_SELECTED_TEAM;
    team: Team;
}

export type SetSelectedAthleteTypes = SetSelectedAthlete;
interface SetSelectedAthlete {
    type: typeof SET_SELECTED_ATHLETE;
    athleteId: string;
}

export type setCurrentUserTypes = SetCurrentUser;
interface SetCurrentUser {
    type: typeof SET_CURRENT_USER;
    currentUser: User;
}

export type setCurrentRosterTypes = SetCurrentRoster;
interface SetCurrentRoster {
    type: typeof GET_CURRENT_ROSTER;
    currentRoster: Athlete[];
}

export type TeamsTypes = GetTeamsAction;
interface GetTeamsAction {
    type: typeof GET_TEAMS;
    teams: Team[];
}

export type AthleteInjuriesTypes = GetAthleteInjuriesAction;
interface GetAthleteInjuriesAction {
    type: typeof GET_ATHLETE_INJURIES;
    athleteInjuries: AthleteInjuries;
}

export type InjuriesStartingDate = SetInjuriesStartingDate;
interface SetInjuriesStartingDate {
    type: typeof SET_STARTING_DATE;
    startingDate: Date;
}

export type InjuriesEndingDate = SetInjuriesEndingDate;
interface SetInjuriesEndingDate {
    type: typeof SET_ENDING_DATE;
    endingDate: Date;
}

/**
 * Represents a sports team.
 */
export interface Team {
    id: string;
    name: string;
    season: string;
    athleteIds: string[];
}

/**
 * Bare information for an athlete.
 */
export interface Athlete {
    id: string;
    name: string;
    injuries: Injury[];
}

/**
 * Detailed information for an athlete.
 */
export interface AthleteProfile {
    id: string;
    profilePicture: string;
    name: string;
    birthdate: string;
    schoolYear: number;
    gender: string;
    weight: number;
    height: number;
    email: string;
    cellPhone: string;
    homePhone: string;
    healthCardNumber: string;
    emergencyContact: EmergencyContact;
    files: string[];
    injuries: Injury[];
}

/**
 * Athlete information needed for athlete list in roster management.
 */
export interface ListAthlete {
    id: string;
    name: string;
    birthdate: string | null;
}

/**
 * Represents the user logged into the application.
 */
export interface User {
    athleteProfile: AthleteProfile;
    permissions: UserPermissions;
}

export interface EmergencyContact {
    id: string;
    name: string;
    phone: string;
    email: string;
}

/**
 * Used to hold information on injury queries on an athlete.
 */
export interface AthleteInjuries {
    injuries: Injury[];
    startDate: string;
    endDate: string;
}

/**
 * Represents an athlete injury
 */
export interface Injury {
    id: string;
    active: boolean;
    createdOn: Date;
    createdBy: string;
    teamName: string;
    athleteName: string;
    injuryDate: Date;
    isSportsRelated: boolean;
    eventType: string;
    sideOfBody: string;
    locationOnBody: string;
    injuryType: string;
    severity: number;
    status: string;
    mechanism: string;
    injuryDescription: string;
    otherNotes: InjuryNote[];
    specialNotes: InjuryNote[];
}

/**
 * Represents notes that live on an injury.
 */
export interface InjuryNote {
    createdBy: string;
    createdOn: Date;
    content: string;
}

/**
 * Types and interfaces for the data table
 */

export type Order = "asc" | "desc";

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Injury;
    label: string;
    numeric: boolean;
}

export const TOGGLE_NAVIGATION_PANEL = "TOGGLE_NAVIGATION_PANEL";
export const SET_SELECTED_TEAM = "SET_SELECTED_TEAM";
export enum NavigationPanelStates {
    open,
    closed
}
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

export interface Team {
    name: string;
    athletes: Athlete[];
}

export interface Athlete {
    id: string;
    name: string;
}

export const GET_ATHLETE_INJURIES = "GET_ATHLETE_INJURIES";
export const SET_STARTING_DATE = "SET_STARTING_DATE";
export const SET_ENDING_DATE = "SET_ENDING_DATE";

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

export interface AthleteInjuries {
    injuries: Injury[];
    startDate: string;
    endDate: string;
}

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
    position: string;
    sideOfBody: string;
    locationOnBody: string;
    injuryType: string;
    severity: number;
    status: string;
    mechanism: string;
    injuryDescription: string;
    otherNotes: InjuryNote[];
}

export interface InjuryNote {
    createdBy: string;
    createdOn: Date;
    content: string;
}

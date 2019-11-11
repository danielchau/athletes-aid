export const TOGGLE_NAVIGATION_PANEL = "TOGGLE_NAVIGATION_PANEL";
export enum NavigationPanelStates {
    open,
    closed
}
export type NavigationPanelTypes = ToggleNavAction;
interface ToggleNavAction {
    type: typeof TOGGLE_NAVIGATION_PANEL;
    state: NavigationPanelStates;
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
    createdAt: Date;
    athleteName: string;
    locationOnBody: string;
    injuryType: string;
    severity: number;
    active: boolean;
}

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

export type AthleteInjuriesTypes = GetAthleteInjuriesAction;
interface GetAthleteInjuriesAction {
    type: typeof GET_ATHLETE_INJURIES;
    athleteInjuries: AthleteInjuries;
}

export interface AthleteInjuries {
    injuries: Injury[];
    startDate: string;
    endDate: string;
}

export interface Injury {
    id: string;
    createdAt: string;
    athleteName: string;
    locationOnBody: string;
    injuryType: string;
    severity: number;
}

import { SetSelectedAthleteTypes, SET_SELECTED_ATHLETE } from "../util/types";

export function selectedAthleteReducer(athleteId: string = "", action: SetSelectedAthleteTypes) {
    switch (action.type) {
        case SET_SELECTED_ATHLETE:
            return action.athleteId;
        default:
            return athleteId;
    }
}

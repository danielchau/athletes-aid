import {
    GET_ATHLETE_INJURIES,
    SET_STARTING_DATE,
    AthleteInjuriesTypes,
    AthleteInjuries,
    InjuriesStartingDate,
    InjuriesEndingDate,
    SET_ENDING_DATE
} from "../util/types";

export function injuriesReducer(
    state: AthleteInjuries = { injuries: [], startDate: "", endDate: "" },
    action: AthleteInjuriesTypes
) {
    switch (action.type) {
        case GET_ATHLETE_INJURIES:
            return action.athleteInjuries;
        default:
            return state;
    }
}

export function startingDateReducer(
    state: Date = new Date(),
    action: InjuriesStartingDate
) {
    switch (action.type) {
        case SET_STARTING_DATE:
            return action.startingDate;
        default:
            return state;
    }
}

export function endingDateReducer(
    state: Date = new Date(),
    action: InjuriesEndingDate
) {
    switch (action.type) {
        case SET_ENDING_DATE:
            return action.endingDate;
        default:
            return state;
    }
}

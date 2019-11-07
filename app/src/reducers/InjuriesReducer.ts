import {
    GET_ATHLETE_INJURIES,
    AthleteInjuriesTypes,
    AthleteInjuries
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

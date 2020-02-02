import {
    GET_TEAMS,
    Team,
    TeamsTypes,
    Athlete,
    GET_CURRENT_ROSTER,
    setCurrentRosterTypes
} from "../util/types";

export function teamsReducer(state: Team[] = [], action: TeamsTypes) {
    switch (action.type) {
        case GET_TEAMS:
            return action.teams;
        default:
            return state;
    }
}

export function currentRosterReducer(state: Athlete[] = null, action: setCurrentRosterTypes) {
    switch (action.type) {
        case GET_CURRENT_ROSTER:
            return action.currentRoster;
        default:
            return state;
    }
}

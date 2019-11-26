import { GET_TEAMS, Team, TeamsTypes } from "../util/types";

export function teamsReducer(state: Team[] = [], action: TeamsTypes) {
    switch (action.type) {
        case GET_TEAMS:
            return action.teams;
        default:
            return state;
    }
}

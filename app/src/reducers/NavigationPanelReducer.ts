import {
    TOGGLE_NAVIGATION_PANEL,
    NavigationPanelTypes,
    NavigationPanelStates,
    SetSelectedTeamTypes,
    SET_SELECTED_TEAM
} from "../util/types";

export function navigationPanelReducer(
    state = NavigationPanelStates.open,
    action: NavigationPanelTypes
) {
    switch (action.type) {
        case TOGGLE_NAVIGATION_PANEL:
            return action.state;
        default:
            return state;
    }
}

export function selectedTeamReducer(
    team: string = "",
    action: SetSelectedTeamTypes
) {
    switch (action.type) {
        case SET_SELECTED_TEAM:
            return action.team;
        default:
            return team;
    }
}

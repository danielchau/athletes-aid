import {
    TOGGLE_NAVIGATION_PANEL,
    NavigationPanelStates,
    SET_SELECTED_TEAM
} from "../util/types";

export function toggleNavigationPanel(state: NavigationPanelStates) {
    return { type: TOGGLE_NAVIGATION_PANEL, state };
}

export function setSelectedTeam(team: string) {
    return { type: SET_SELECTED_TEAM, team };
}

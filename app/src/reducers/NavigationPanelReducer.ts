import {
    TOGGLE_NAVIGATION_PANEL,
    NavigationPanelTypes,
    NavigationPanelStates
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

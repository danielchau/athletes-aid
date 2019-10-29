import { TOGGLE_NAVIGATION_PANEL, NavigationPanelStates } from "../util/types";
export function toggleNavigationPanel(state: NavigationPanelStates) {
    return { type: TOGGLE_NAVIGATION_PANEL, state };
}

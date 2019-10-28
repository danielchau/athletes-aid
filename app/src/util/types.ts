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

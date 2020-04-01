import { navigationPanelReducer, selectedTeamReducer } from "./NavigationPanelReducer";
import { injuriesReducer, startingDateReducer, endingDateReducer } from "./InjuriesReducer";
import { selectedAthleteReducer } from "./AthleteReducer";
import { teamsReducer, currentRosterReducer } from "./InitialReducer";
import { currentUserReducer, isAuthenticatingReducer } from "./UserReducer";
import { combineReducers } from "redux";

/**
 * The Root Reducer combines all Redux Reducers for use in containers.
 */
const rootReducer = combineReducers({
    navigationPanelReducer,
    selectedTeamReducer,
    injuriesReducer,
    startingDateReducer,
    endingDateReducer,
    teamsReducer,
    selectedAthleteReducer,
    currentUserReducer,
    currentRosterReducer,
    isAuthenticatingReducer
});

export default rootReducer;

import { navigationPanelReducer, selectedTeamReducer } from "./NavigationPanelReducer";
import { injuriesReducer, startingDateReducer, endingDateReducer } from "./InjuriesReducer";
import { selectedAthleteReducer } from "./AthleteReducer";
import { teamsReducer } from "./InitialReducer";
import { currentUserReducer } from "./UserReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    navigationPanelReducer,
    selectedTeamReducer,
    injuriesReducer,
    startingDateReducer,
    endingDateReducer,
    teamsReducer,
    selectedAthleteReducer,
    currentUserReducer
});

export default rootReducer;

import {
    navigationPanelReducer,
    selectedTeamReducer
} from "./NavigationPanelReducer";
import {
    injuriesReducer,
    startingDateReducer,
    endingDateReducer
} from "./InjuriesReducer";
import { teamsReducer } from "./InitialReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    navigationPanelReducer,
    selectedTeamReducer,
    injuriesReducer,
    startingDateReducer,
    endingDateReducer,
    teamsReducer
});

export default rootReducer;

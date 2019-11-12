import {
    navigationPanelReducer,
    selectedTeamReducer
} from "../reducers/NavigationPanelReducer";
import {
    injuriesReducer,
    startingDateReducer,
    endingDateReducer
} from "../reducers/InjuriesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    navigationPanelReducer,
    selectedTeamReducer,
    injuriesReducer,
    startingDateReducer,
    endingDateReducer
});

export default rootReducer;

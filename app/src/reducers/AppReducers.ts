import { navigationPanelReducer } from "../reducers/NavigationPanelReducer";
import {
    injuriesReducer,
    startingDateReducer,
    endingDateReducer
} from "../reducers/InjuriesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    navigationPanelReducer,
    injuriesReducer,
    startingDateReducer,
    endingDateReducer
});

export default rootReducer;

import { navigationPanelReducer } from "../reducers/NavigationPanelReducer";
import { injuriesReducer } from "../reducers/InjuriesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    navigationPanelReducer,
    injuriesReducer
});

export default rootReducer;

import { connect } from "react-redux";
import RosterManagementPage from "../components/RosterManagementPage";
import { AppState } from "..";

const mapStateToProps = (state: AppState) => ({
    state: state.navigationPanelReducer,
    teams: state.teamsReducer
});

const RosterManagementPageContainer = connect(mapStateToProps)(
    RosterManagementPage
);

export default RosterManagementPageContainer;

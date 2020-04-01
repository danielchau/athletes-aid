import { connect } from "react-redux";
import RosterManagementPage from "../components/RosterManagementPage";
import { AppState } from "..";
import { fetchTeams, fetchCurrentRoster } from "../actions/TeamAction";
import { Team } from "../util/types";
import { setSelectedTeam } from "../actions/NavigationPanelAction";
import { UserPermissions } from "../util/permissions";

const mapStateToProps = (state: AppState) => ({
    state: state.navigationPanelReducer,
    currentUser: state.currentUserReducer
});

const mapDispatchToProps = (dispatch: any) => ({});

const RosterManagementPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RosterManagementPage);

export default RosterManagementPageContainer;

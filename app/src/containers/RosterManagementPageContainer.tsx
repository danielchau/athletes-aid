import { connect } from "react-redux";
import RosterManagementPage from "../components/RosterManagementPage";
import { AppState } from "..";
import { fetchTeams, fetchCurrentRoster } from "../actions/TeamAction";
import { Team } from "../util/types";
import { setSelectedTeam } from "../actions/NavigationPanelAction";

const mapStateToProps = (state: AppState) => ({
    state: state.navigationPanelReducer,
    teams: state.teamsReducer,
    currentUser: state.currentUserReducer,
    selectedTeam: state.selectedTeamReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedTeam: (team: Team) => dispatch(setSelectedTeam(team)),
    getTeams: (id: string) => dispatch(fetchTeams(id))
});

const RosterManagementPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RosterManagementPage);

export default RosterManagementPageContainer;

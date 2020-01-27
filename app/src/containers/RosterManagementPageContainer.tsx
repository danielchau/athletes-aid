import { connect } from "react-redux";
import RosterManagementPage from "../components/RosterManagementPage";
import { AppState } from "..";
import { fetchTeams } from "../actions/TeamAction";

const mapStateToProps = (state: AppState) => ({
    state: state.navigationPanelReducer,
    teams: state.teamsReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getTeams: (id: string) => dispatch(fetchTeams(id))
});

const RosterManagementPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RosterManagementPage);

export default RosterManagementPageContainer;

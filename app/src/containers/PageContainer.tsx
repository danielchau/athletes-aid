import { connect } from "react-redux";
import {
    toggleNavigationPanel,
    setSelectedTeam
} from "../actions/NavigationPanelAction";
import Page from "../components/Page";
import { AppState } from "..";
import { NavigationPanelStates, Team } from "../util/types";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: AppState) => ({
    state: state.navigationPanelReducer,
    selectedTeam: state.selectedTeamReducer,
    teams: state.teamsReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedTeam: (team: Team) => dispatch(setSelectedTeam(team)),
    handleDrawerClose: () =>
        dispatch(toggleNavigationPanel(NavigationPanelStates.closed)),
    handleDrawerOpen: () =>
        dispatch(toggleNavigationPanel(NavigationPanelStates.open))
});

const PageContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Page)
);

export default PageContainer;

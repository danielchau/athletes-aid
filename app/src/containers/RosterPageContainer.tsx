import { connect } from "react-redux";
import { AppState } from "..";
import RosterPage from "../components/RosterPage";
import { withRouter } from "react-router-dom";
import { setSelectedAthlete } from "../actions/AthleteAction";
import { fetchCurrentRoster } from "../actions/TeamAction";

const mapStateToProps = (state: AppState) => ({
    selectedTeam: state.selectedTeamReducer,
    currentRoster: state.currentRosterReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedAthlete: (id: string) => dispatch(setSelectedAthlete(id)),
    getCurrentRoster: (athleteIds: string[]) => dispatch(fetchCurrentRoster(athleteIds))
});

const RosterPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RosterPage));

export default RosterPageContainer;

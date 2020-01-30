import { connect } from "react-redux";
import { AppState } from "..";
import RosterPage from "../components/RosterPage";
import { withRouter } from "react-router-dom";
import { setSelectedAthlete } from "../actions/AthleteAction";

const mapStateToProps = (state: AppState) => ({
    selectedTeam: state.selectedTeamReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedAthlete: (id: string) => dispatch(setSelectedAthlete(id))
});

const RosterPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RosterPage));

export default RosterPageContainer;

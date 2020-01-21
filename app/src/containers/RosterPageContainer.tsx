import { connect } from "react-redux";
import { AppState } from "..";
import RosterPage from "../components/RosterPage";

const mapStateToProps = (state: AppState) => ({
    selectedTeam: state.selectedTeamReducer
});

const RosterPageContainer = connect(mapStateToProps)(RosterPage);

export default RosterPageContainer;

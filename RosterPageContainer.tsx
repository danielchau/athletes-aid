import { connect } from "react-redux";
import RosterPage from "../components/RosterPage";
import { AppState } from "..";
import { Injury } from "../util/types";

const mapStateToProps = (state: AppState) => ({
  teams: state.teamsReducer
});

const RosterPageContainer = connect(mapStateToProps)(RosterPage);

export default RosterPageContainer;

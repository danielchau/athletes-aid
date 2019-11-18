import { connect } from "react-redux";
import InjuryLoggingPage from "../components/InjuryLoggingPage";
import { AppState } from "..";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: AppState) => ({
    selectedTeam: state.selectedTeamReducer
});

const InjuryLoggingPageContainer = withRouter(
    connect(mapStateToProps)(InjuryLoggingPage)
);

export default InjuryLoggingPageContainer;

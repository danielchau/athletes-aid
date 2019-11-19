import { connect } from "react-redux";
import InjuryLoggingPage from "../components/InjuryLoggingPage";
import { AppState } from "..";
import { withRouter } from "react-router-dom";
import { Injury } from "../util/types";

interface InjuriesPageContainerProps {
    existingInjury: Injury | null;
    callbackUponFinishing: any;
}

const mapStateToProps = (
    state: AppState,
    ownProps: InjuriesPageContainerProps
) => ({
    selectedTeam: state.selectedTeamReducer,
    existingInjury: ownProps.existingInjury,
    callbackUponFinishing: ownProps.callbackUponFinishing
});

const InjuryLoggingPageContainer = connect(mapStateToProps)(InjuryLoggingPage);

export default InjuryLoggingPageContainer;

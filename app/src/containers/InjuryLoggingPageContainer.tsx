import { connect } from "react-redux";
import InjuryLoggingPage from "../components/InjuryLoggingPage";
import { AppState } from "..";
import { Injury } from "../util/types";
import { fetchTeams } from "../actions/TeamAction";

interface InjuriesPageContainerProps {
    existingInjury: Injury | null;
    callbackUponFinishing: any;
}

const mapStateToProps = (state: AppState, ownProps: InjuriesPageContainerProps) => ({
    selectedTeam: state.selectedTeamReducer,
    existingInjury: ownProps.existingInjury,
    callbackUponFinishing: ownProps.callbackUponFinishing,
    currentUser: state.currentUserReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getTeams: (id: string) => dispatch(fetchTeams(id))
});

const InjuryLoggingPageContainer = connect(mapStateToProps, mapDispatchToProps)(InjuryLoggingPage);

export default InjuryLoggingPageContainer;

import { connect } from "react-redux";
import InjuryLoggingPage from "../components/InjuryLoggingPage";
import { AppState } from "..";
import { Injury } from "../util/types";
import { fetchTeams, fetchCurrentRoster } from "../actions/TeamAction";

interface InjuriesPageContainerProps {
    existingInjury: Injury | null;
    callbackUponFinishing: any;
}

const mapStateToProps = (state: AppState, ownProps: InjuriesPageContainerProps) => ({
    selectedTeam: state.selectedTeamReducer,
    existingInjury: ownProps.existingInjury,
    callbackUponFinishing: ownProps.callbackUponFinishing,
    currentUser: state.currentUserReducer,
    currentRoster: state.currentRosterReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getTeams: (id: string) => dispatch(fetchTeams(id)),
    getCurrentRoster: (athleteIds: string[]) => dispatch(fetchCurrentRoster(athleteIds))
});

const InjuryLoggingPageContainer = connect(mapStateToProps, mapDispatchToProps)(InjuryLoggingPage);

export default InjuryLoggingPageContainer;

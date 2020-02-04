import { connect } from "react-redux";
import { AppState } from "..";
import { AthleteProfile } from "../util/types";
import ProfilePage from "../components/ProfilePage";
import { fetchAthleteInjuries } from "../actions/InjuriesAction";
import { fetchCurrentRoster } from "../actions/TeamAction";

interface ProfilePageContainerProps {
    currentAthlete: AthleteProfile;
    canEdit: boolean;
}

const mapStateToProps = (state: AppState, ownProps: ProfilePageContainerProps) => ({
    state: state.navigationPanelReducer,
    currentAthlete: ownProps.currentAthlete,
    canEdit: ownProps.canEdit,
    startingDate: state.startingDateReducer,
    endingDate: state.endingDateReducer,
    selectedTeam: state.selectedTeamReducer,
    currentUser: state.currentUserReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) =>
        dispatch(fetchAthleteInjuries(startDate, endDate, team)),
    getCurrentRoster: (athleteIds: string[]) => dispatch(fetchCurrentRoster(athleteIds))
});

const ProfilePageContainer = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

export default ProfilePageContainer;

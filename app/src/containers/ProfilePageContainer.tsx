import { connect } from "react-redux";
import { AppState } from "..";
import { AthleteProfile } from "../util/types";
import ProfilePage from "../components/ProfilePage";

interface ProfilePageContainerProps {
    currentAthlete: AthleteProfile;
}

const mapStateToProps = (
    state: AppState,
    ownProps: ProfilePageContainerProps
) => ({
    state: state.navigationPanelReducer,
    currentAthlete: ownProps.currentAthlete
});

const mapDispatchToProps = (_: any) => ({});

const ProfilePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);

export default ProfilePageContainer;

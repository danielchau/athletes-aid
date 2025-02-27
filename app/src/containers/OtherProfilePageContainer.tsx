import { connect } from "react-redux";
import { AppState } from "..";
import OtherProfilePage from "../components/OtherProfilePage";

const mapStateToProps = (state: AppState) => ({
    selectedAthleteId: state.selectedAthleteReducer,
    currentUser: state.currentUserReducer
});

const OtherProfilePageContainer = connect(mapStateToProps)(OtherProfilePage);

export default OtherProfilePageContainer;

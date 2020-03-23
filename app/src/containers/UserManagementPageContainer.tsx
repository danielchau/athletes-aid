import { connect } from "react-redux";
import UserManagementPage from "../components/UserManagementPage";
import { AppState } from "..";

const mapStateToProps = (state: AppState) => ({
    currentUser: state.currentUserReducer,
    teams: state.teamsReducer
});

const mapDispatchToProps = (dispatch: any) => ({});

const UserManagementPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagementPage);

export default UserManagementPageContainer;

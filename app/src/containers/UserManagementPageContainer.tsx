import { connect } from "react-redux";
import UserManagementPage from "../components/UserManagementPage";
import { AppState } from "..";

const mapStateToProps = (state: AppState) => ({
    currentUser: state.currentUserReducer
});

const mapDispatchToProps = (dispatch: any) => ({});

const UserManagementPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagementPage);

export default UserManagementPageContainer;

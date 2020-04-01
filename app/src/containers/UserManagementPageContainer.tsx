import { connect } from "react-redux";
import UserManagementPage from "../components/UserManagementPage";
import { AppState } from "..";
import { UserPermissions } from "../util/permissions";
import { fetchTeams } from "../actions/TeamAction";

const mapStateToProps = (state: AppState) => ({
    currentUser: state.currentUserReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getTeams: (permissions: UserPermissions) => dispatch(fetchTeams(permissions))
});

const UserManagementPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagementPage);

export default UserManagementPageContainer;

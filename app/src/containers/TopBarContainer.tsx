import { connect } from "react-redux";
import { toggleNavigationPanel } from "../actions/NavigationPanelAction";
import TopBar from "../components/TopBar";
import { AppState } from "..";
import { NavigationPanelStates } from "../util/types";

const mapStateToProps = (state: AppState) => ({
    state: state.navigationPanelReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    handleDrawerClose: () =>
        dispatch(toggleNavigationPanel(NavigationPanelStates.closed)),
    handleDrawerOpen: () =>
        dispatch(toggleNavigationPanel(NavigationPanelStates.open))
});

const TopNavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBar);

export default TopNavBar;

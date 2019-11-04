import { connect } from "react-redux";
import { toggleNavigationPanel } from "../actions/NavigationPanelAction";
import Page from "../components/Page";
import { AppState } from "..";
import { NavigationPanelStates } from "../util/types";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: AppState) => ({
    state: state.navigationPanelReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    handleDrawerClose: () =>
        dispatch(toggleNavigationPanel(NavigationPanelStates.closed)),
    handleDrawerOpen: () =>
        dispatch(toggleNavigationPanel(NavigationPanelStates.open))
});

const PageContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Page)
);

export default PageContainer;

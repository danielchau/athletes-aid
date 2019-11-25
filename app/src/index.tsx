import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducers/AppReducers";
import PageContainer from "./containers/PageContainer";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import { getTeams } from "./actions/InitialAction";
import { setSelectedTeam } from "./actions/NavigationPanelAction";
import { connect } from "react-redux";
import { Team } from "./util/types";

interface AppProps {
    teams: Team[];
    getTeams: (id: string) => void;
    setTeam: (team: Team) => void;
}

class App extends React.Component<AppProps, {}> {
    componentDidMount() {
        this.props.getTeams("");
    }

    componentDidUpdate() {
        this.props.setTeam(this.props.teams[0]);
    }

    render() {
        return (
            <div>
                <Router>
                    <PageContainer />
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    teams: state.teamsReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getTeams: (id: string) => dispatch(getTeams(id)),
    setTeam: (team: Team) => dispatch(setSelectedTeam(team))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;

export const store = createStore(
    rootReducer /* preloadedState, */,
    applyMiddleware(thunkMiddleware)
);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector("#root")
);

export type AppState = ReturnType<typeof rootReducer>;

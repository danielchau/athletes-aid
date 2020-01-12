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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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

const THEME = createMuiTheme({
    typography: {
        fontFamily: '"Klavika", "Roboto", "Helvetica", "Arial", sans-serif'
    },
    palette: {
        primary: {
            main: "#0055B7"
        },
        secondary: {
            main: "#F2A71E"
        },
        background: {
            default: "#FFFFFF"
        }
    }
});

render(
    <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </MuiThemeProvider>,
    document.querySelector("#root")
);

export type AppState = ReturnType<typeof rootReducer>;

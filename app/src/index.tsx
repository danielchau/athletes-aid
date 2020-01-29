import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducers/AppReducers";
import PageContainer from "./containers/PageContainer";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import { fetchTeams } from "./actions/TeamAction";
import { setSelectedTeam } from "./actions/NavigationPanelAction";
import { connect } from "react-redux";
import { Team } from "./util/types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

interface AppProps {
    teams: Team[];
    getTeams: (id: string) => void;
    setTeam: (team: Team) => void;
}

interface AppStates {
    isLoading: boolean;
}

class App extends React.Component<AppProps, AppStates> {
    constructor(props: AppProps) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        this.props.getTeams("");
    }

    componentDidUpdate() {
        this.props.setTeam(this.props.teams[0]);
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 750);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        width: "calc(100vw  - 16px)",
                        height: "calc(100vh  - 16px)"
                    }}
                >
                    <img
                        style={{ width: "60px" }}
                        src="https://s3.amazonaws.com/streamlineathletes.com/assets/programs/22/university-british-columbia_track-field_thunderbirds_logo.png"
                    />
                    <CircularProgress size={40} color={"secondary"} />
                </div>
            );
        }
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
    getTeams: (id: string) => dispatch(fetchTeams(id)),
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

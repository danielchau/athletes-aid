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
import { Team, User } from "./util/types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { setCurrentUser, getUser, setIsAuthenticating } from "./actions/UserAction";
import { UserPermissions, AdminPermissions, TrainerPermissions } from "./util/permissions";
// @ts-ignore
import Logo from "./util/logoBlue.png";

interface AppProps {
    teams: Team[];
    getTeams: (permissions: UserPermissions) => void;
    setTeam: (team: Team) => void;
    setCurrentUser: (user: User) => void;
    isAuthenticating: boolean;
    setIsAuthenticating: (state: boolean) => void;
}

interface AppStates {
    isLoading: boolean;
}

/**
 * Application container that does the initial rendering.
 * Do initial actions and fetches here that need to be done on initial application laod.
 */
class App extends React.Component<AppProps, AppStates> {
    constructor(props: AppProps) {
        super(props);
        this.state = { isLoading: false };
    }

    componentDidMount() {
        getUser().then((user: User | null) => {
            if (!!user) {
                this.props.getTeams(
                    user.permissions == AdminPermissions ? TrainerPermissions : user.permissions
                );
                this.props.setCurrentUser(user);
                this.setState({ isLoading: true });
                this.props.setIsAuthenticating(false);
            } else {
                window.location.replace(window.location.href + "/login");
            }
        });
    }

    shouldComponentUpdate(nextProps: AppProps, nextState: AppStates) {
        if (this.state.isLoading != nextState.isLoading) {
            return true;
        }
        if (nextProps.teams != this.props.teams) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        if (this.state.isLoading) {
            this.props.setTeam(!!this.props.teams[0] ? this.props.teams[0] : null);
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 750);
        }
    }

    render() {
        if (this.state.isLoading || this.props.isAuthenticating) {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        width: "calc(100%  - 16px)",
                        height: "calc(100%  - 16px)"
                    }}
                >
                    <img
                        style={{ width: "60px" }}
                        src="https://s3.amazonaws.com/streamlineathletes.com/assets/programs/22/university-british-columbia_track-field_thunderbirds_logo.png"
                    />
                    <img style={{ width: "300px", paddingBottom: "16px" }} src={Logo} />
                    <CircularProgress size={40} color={"secondary"} />
                </div>
            );
        }
        return (
            <Router>
                <PageContainer />
            </Router>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    teams: state.teamsReducer,
    isAuthenticating: state.isAuthenticatingReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getTeams: (permissions: UserPermissions) => dispatch(fetchTeams(permissions)),
    setTeam: (team: Team) => dispatch(setSelectedTeam(team)),
    setCurrentUser: (user: User) => dispatch(setCurrentUser(user)),
    setIsAuthenticating: (state: boolean) => dispatch(setIsAuthenticating(state))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;

export const store = createStore(
    rootReducer /* preloadedState, */,
    applyMiddleware(thunkMiddleware)
);

/**
 * Material UI Theme for the app.
 */
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

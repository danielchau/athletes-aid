import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducers/AppReducers";
import PageContainer from "./containers/PageContainer";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { devToolsEnhancer } from "redux-devtools-extension";
import { BrowserRouter as Router } from "react-router-dom";
import { getTeams } from "./actions/InitialAction";
import { connect } from "react-redux";

interface AppProps {
    getTeams: () => void;
}

class App extends React.Component<AppProps, {}> {
    componentDidMount() {
        this.props.getTeams();
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

const mapStateToProps = (_: AppState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    getTeams: (id: string) => dispatch(getTeams(id))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer /* preloadedState, */,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector("#root")
);

export type AppState = ReturnType<typeof rootReducer>;

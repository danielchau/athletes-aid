import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducers/AppReducers";
import PageContainer from "./containers/PageContainer";
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
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

export const store = createStore(
    rootReducer /* preloadedState, */,
    devToolsEnhancer({})
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);

export type AppState = ReturnType<typeof rootReducer>;

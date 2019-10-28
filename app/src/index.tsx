import * as React from "react";
import { render } from "react-dom";
import { Hello } from "./components/Hello";
import { Provider } from "react-redux";
import rootReducer from "./reducers/AppReducers";
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

// Calling `store.getState()` returns our state object
class App extends React.Component {
    render() {
        return (
            <div style={{ fontSize: 100 }}>
                <Hello compiler="TypeScript" framework="React" />
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

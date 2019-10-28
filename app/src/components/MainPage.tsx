import * as React from "react";
import TopNavBar from "../containers/TopBarContainer";

export interface MainPageProps {}

export class MainPage extends React.Component<MainPageProps, {}> {
    render() {
        return <TopNavBar />;
    }
}

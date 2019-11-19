import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationPanel from "./NavigationPanel";
import { NavigationPanelStates, Team } from "../util/types";
import { pageStyles } from "../styles/react/PageStyle";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import {
    homePath,
    profilePath,
    rosterPath,
    injuryLoggingPath,
    injuriesPath,
    rosterManagementPath
} from "../constants/constants";
import TopBar from "./TopBar";
import InjuriesPageContainer from "../containers/InjuriesPageContainer";
import InjuryLoggingPageContainer from "../containers/InjuryLoggingPageContainer";

interface PageProps {
    state: NavigationPanelStates;
    selectedTeam: Team;
    setSelectedTeam: any;
    handleDrawerClose: any;
    handleDrawerOpen: any;
}

export default function Page(props: PageProps & RouteComponentProps) {
    const classes = pageStyles({});

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.appBarContainer}>
                <TopBar
                    state={props.state}
                    handleDrawerOpen={props.handleDrawerOpen}
                ></TopBar>
            </div>
            <div className={classes.pageBodyContainer}>
                <NavigationPanel
                    state={props.state}
                    handleDrawerClose={props.handleDrawerClose}
                    selectedTeam={props.selectedTeam}
                    setSelectedTeam={props.setSelectedTeam}
                    history={props.history}
                    location={props.location}
                    match={props.match}
                />
                <Switch>
                    <Route path={profilePath}>
                        <h2>My Profile</h2>
                    </Route>
                    <Route path={rosterPath}>
                        <h2>Roster</h2>
                    </Route>
                    <Route path={injuryLoggingPath}>
                        <InjuryLoggingPageContainer
                            existingInjury={null}
                            callbackUponFinishing={null}
                        ></InjuryLoggingPageContainer>
                    </Route>
                    <Route path={injuriesPath}>
                        <InjuriesPageContainer></InjuriesPageContainer>
                    </Route>
                    <Route path={rosterManagementPath}>
                        <h2>Roster Management</h2>
                    </Route>
                    <Route path={homePath}>
                        <h2>Home</h2>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationPanel from "./NavigationPanel";
import { NavigationPanelStates, Team, User, Athlete } from "../util/types";
import { pageStyles } from "../styles/react/PageStyle";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import {
    rosterPath,
    injuryLoggingPath,
    injuriesPath,
    rosterManagementPath,
    profilePath,
    userManagementPath
} from "../constants/constants";
import TopBar from "./TopBar";
import InjuriesPageContainer from "../containers/InjuriesPageContainer";
import InjuryLoggingPageContainer from "../containers/InjuryLoggingPageContainer";
import RosterManagementPageContainer from "../containers/RosterManagementPageContainer";
import ProfilePageContainer from "../containers/ProfilePageContainer";
import RosterPageContainer from "../containers/RosterPageContainer";
import OtherProfilePageContainer from "../containers/OtherProfilePageContainer";
import UserManagementPageContainer from "../containers/UserManagementPageContainer";

interface PageProps {
    state: NavigationPanelStates;
    selectedTeam: Team;
    setSelectedTeam: any;
    handleDrawerClose: any;
    handleDrawerOpen: any;
    teams: Team[];
    setSelectedAthlete: (id: string) => void;
    currentUser: User;
    currentRoster: Athlete[];
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
    setIsAuthenticating: (state: boolean) => void;
}

/**
 * Page is the parent conatiner for all of the pages and handles routing and rendering of the
 * top bar and the navigation panel.
 * @param props
 */
export default function Page(props: PageProps & RouteComponentProps) {
    const classes = pageStyles({});

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.appBarContainer}>
                <TopBar
                    state={props.state}
                    handleDrawerOpen={props.handleDrawerOpen}
                    handleDrawerClose={props.handleDrawerClose}
                    selectedTeam={props.selectedTeam}
                    setSelectedAthlete={props.setSelectedAthlete}
                    currentUser={props.currentUser}
                    currentRoster={props.currentRoster}
                    getCurrentRoster={props.getCurrentRoster}
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
                    teams={props.teams}
                    currentUser={props.currentUser}
                    setIsAuthenticating={props.setIsAuthenticating}
                />
                <Switch>
                    {props.currentUser.permissions.pages.roster && (
                        <Route path={rosterPath}>
                            <RosterPageContainer></RosterPageContainer>
                        </Route>
                    )}
                    {props.currentUser.permissions.pages.logging && (
                        <Route path={injuryLoggingPath}>
                            <InjuryLoggingPageContainer
                                existingInjury={null}
                                callbackUponFinishing={null}
                            ></InjuryLoggingPageContainer>
                        </Route>
                    )}
                    {props.currentUser.permissions.pages.rosterManagement && (
                        <Route path={rosterManagementPath}>
                            <RosterManagementPageContainer></RosterManagementPageContainer>
                        </Route>
                    )}
                    {props.currentUser.permissions.pages.userManagement && (
                        <Route path={userManagementPath}>
                            <UserManagementPageContainer />
                        </Route>
                    )}
                    {props.currentUser.permissions.pages.profiles && (
                        <Route path={profilePath}>
                            <OtherProfilePageContainer />
                        </Route>
                    )}
                    {props.currentUser.permissions.pages.injuries && (
                        <Route path={injuriesPath}>
                            <InjuriesPageContainer></InjuriesPageContainer>
                        </Route>
                    )}
                </Switch>
            </div>
        </div>
    );
}

import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationPanel from "./NavigationPanel";
import { NavigationPanelStates, Team, User } from "../util/types";
import { pageStyles } from "../styles/react/PageStyle";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import {
    myProfilePath,
    rosterPath,
    injuryLoggingPath,
    injuriesPath,
    rosterManagementPath,
    profilePath
} from "../constants/constants";
import TopBar from "./TopBar";
import InjuriesPageContainer from "../containers/InjuriesPageContainer";
import InjuryLoggingPageContainer from "../containers/InjuryLoggingPageContainer";
import RosterManagementPageContainer from "../containers/RosterManagementPageContainer";
import ProfilePageContainer from "../containers/ProfilePageContainer";
import RosterPageContainer from "../containers/RosterPageContainer";
import OtherProfilePageContainer from "../containers/OtherProfilePageContainer";

interface PageProps {
    state: NavigationPanelStates;
    selectedTeam: Team;
    setSelectedTeam: any;
    handleDrawerClose: any;
    handleDrawerOpen: any;
    teams: Team[];
    setSelectedAthlete: (id: string) => void;
    currentUser: User;
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
                    handleDrawerClose={props.handleDrawerClose}
                    selectedTeam={props.selectedTeam}
                    setSelectedAthlete={props.setSelectedAthlete}
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
                />
                <Switch>
                    <Route path={myProfilePath}>
                        <ProfilePageContainer
                            currentAthlete={props.currentUser.athleteProfile}
                            canEdit={true}
                        ></ProfilePageContainer>
                    </Route>
                    <Route path={rosterPath}>
                        <RosterPageContainer></RosterPageContainer>
                    </Route>
                    <Route path={injuryLoggingPath}>
                        <InjuryLoggingPageContainer
                            existingInjury={null}
                            callbackUponFinishing={null}
                        ></InjuryLoggingPageContainer>
                    </Route>
                    <Route path={rosterManagementPath}>
                        <RosterManagementPageContainer></RosterManagementPageContainer>
                    </Route>
                    <Route path={profilePath}>
                        <OtherProfilePageContainer />
                    </Route>
                    <Route path={injuriesPath}>
                        <InjuriesPageContainer></InjuriesPageContainer>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

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
import RosterManagementPageContainer from "../containers/RosterManagementPageContainer";
import ProfilePage from "./ProfilePage";

interface PageProps {
    state: NavigationPanelStates;
    selectedTeam: Team;
    setSelectedTeam: any;
    handleDrawerClose: any;
    handleDrawerOpen: any;
    teams: Team[];
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
                    teams={props.teams}
                />
                <Switch>
                    <Route path={profilePath}>
                        <ProfilePage
                            currentAthlete={{
                                id: "1",
                                profilePicture:
                                    "https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/23270537_1754541497892311_2239260117644537268_o.jpg?_nc_cat=110&_nc_ohc=KpHOGrkCz2UAQnatg2Mri2JdHukWWzl7-6G2M6JdvFxYxACuiM8n8bjZQ&_nc_ht=scontent-sea1-1.xx&oh=e7f52a779c18c2bf009eabaf1fd04482&oe=5E9F4B82",
                                name: "Daniel Chau",
                                birthdate: new Date().toDateString(),
                                schoolYear: 4,
                                gender: "Male",
                                weight: 50,
                                height: 180,
                                email: "daniel_chau@live.com",
                                cellPhone: "647-960-9029",
                                homePhone: "905-403-8062",
                                healthCardNumber: "XXXX000XX0000",
                                emergencyContact: {
                                    id: "2",
                                    name: "Mark Number",
                                    cellPhone: "647-960-9029",
                                    homePhone: "905-403-8062",
                                    email: "mark_number@live.com"
                                },
                                files: [],
                                injuries: []
                            }}
                        ></ProfilePage>
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
                        <RosterManagementPageContainer></RosterManagementPageContainer>
                    </Route>
                    <Route path={homePath}>
                        <h2>Home</h2>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

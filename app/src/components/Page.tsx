import * as React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavigationPanel from "./NavigationPanel";
import { NavigationPanelStates } from "../util/types";
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

interface PageProps {
    state: NavigationPanelStates;
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
                        <h2>Logging</h2>
                    </Route>
                    <Route path={injuriesPath}>
                        <h2>Injuries</h2>
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

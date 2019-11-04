import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import DescriptionIcon from "@material-ui/icons/Description";
import HealingIcon from "@material-ui/icons/Healing";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { navigationPanelStyles } from "../styles/react/NavigationPanelStyle";
import { NavigationPanelStates } from "../util/types";
import {
    homePageName,
    profilePageName,
    rosterPageName,
    injuryLoggingPageName,
    injuriesPageName,
    rosterManagementPageName,
    homePath,
    profilePath,
    rosterPath,
    injuryLoggingPath,
    injuriesPath,
    rosterManagementPath
} from "../constants/constants";

interface NavigationPanelProps {
    state: NavigationPanelStates;
    handleDrawerClose: any;
}

export default function NavigationPanel(props: NavigationPanelProps) {
    const classes = navigationPanelStyles({});

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]:
                    props.state === NavigationPanelStates.open,
                [classes.drawerClose]: !(
                    props.state === NavigationPanelStates.open
                )
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]:
                        props.state === NavigationPanelStates.open,
                    [classes.drawerClose]: !(
                        props.state === NavigationPanelStates.open
                    )
                })
            }}
            open={props.state === NavigationPanelStates.open}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={props.handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <Link className={classes.link} to={homePath}>
                    <ListItem button key={homePageName}>
                        <ListItemIcon>
                            <HomeIcon></HomeIcon>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={homePageName}
                        />
                    </ListItem>
                </Link>
                <Link className={classes.link} to={profilePath}>
                    <ListItem button key={profilePageName}>
                        <ListItemIcon>
                            <PersonIcon></PersonIcon>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={profilePageName}
                        />
                    </ListItem>
                </Link>
                <Link className={classes.link} to={rosterPath}>
                    <ListItem button key={rosterPageName}>
                        <ListItemIcon>
                            <GroupIcon></GroupIcon>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={rosterPageName}
                        />
                    </ListItem>
                </Link>
                <Link className={classes.link} to={injuryLoggingPath}>
                    <ListItem button key={injuryLoggingPageName}>
                        <ListItemIcon>
                            <DescriptionIcon></DescriptionIcon>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={injuryLoggingPageName}
                        />
                    </ListItem>
                </Link>
                <Link className={classes.link} to={injuriesPath}>
                    <ListItem button key={injuriesPageName}>
                        <ListItemIcon>
                            <HealingIcon></HealingIcon>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={injuriesPageName}
                        />
                    </ListItem>
                </Link>
                <Link className={classes.link} to={rosterManagementPath}>
                    <ListItem button key={rosterManagementPageName}>
                        <ListItemIcon>
                            <SettingsIcon></SettingsIcon>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={rosterManagementPageName}
                        />
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
}

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
import { navigationPanelStyles } from "../styles/react/NavigationPanelStyle";
import { NavigationPanelStates } from "../util/types";

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
                {[
                    "Home",
                    "My Profile",
                    "Roster",
                    "Injury Logging",
                    "Injuries",
                    "Roster Management"
                ].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{determineListIcon(text)}</ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={text}
                        />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

function determineListIcon(item: string) {
    switch (item) {
        case "Home":
            return <HomeIcon></HomeIcon>;
        case "My Profile":
            return <PersonIcon></PersonIcon>;
        case "Roster":
            return <GroupIcon></GroupIcon>;
        case "Injury Logging":
            return <DescriptionIcon></DescriptionIcon>;
        case "Injuries":
            return <HealingIcon></HealingIcon>;
        case "Roster Management":
            return <SettingsIcon></SettingsIcon>;
        default:
            return <HomeIcon></HomeIcon>;
    }
}

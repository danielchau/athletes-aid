import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import DescriptionIcon from "@material-ui/icons/Description";
import HealingIcon from "@material-ui/icons/Healing";
import SettingsIcon from "@material-ui/icons/Settings";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import clsx from "clsx";
import { Link, RouteComponentProps } from "react-router-dom";
import { navigationPanelStyles } from "../styles/react/NavigationPanelStyle";
import { NavigationPanelStates, Team, User } from "../util/types";
import {
    profilePageName,
    rosterPageName,
    injuryLoggingPageName,
    injuriesPageName,
    rosterManagementPageName,
    myProfilePath,
    rosterPath,
    injuryLoggingPath,
    injuriesPath,
    rosterManagementPath
} from "../constants/constants";
import { Typography } from "@material-ui/core";

interface NavigationPanelProps {
    state: NavigationPanelStates;
    handleDrawerClose: any;
    selectedTeam: Team;
    setSelectedTeam: any;
    teams: Team[];
    currentUser: User;
}

/**
 * Navigation Panel displays navigation on the left side of the screen.
 * The contents depend on what role the user is.
 * @param props
 */
export default function NavigationPanel(props: NavigationPanelProps & RouteComponentProps) {
    const classes = navigationPanelStyles({});
    const [teamToggleAnchorEl, setTeamToggleAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClickTeamToggle = (event: React.MouseEvent<HTMLElement>) => {
        setTeamToggleAnchorEl(event.currentTarget);
    };

    const handleTeamClick = (_: React.MouseEvent<HTMLElement>, index: number) => {
        props.setSelectedTeam(props.teams[index]);
        setTeamToggleAnchorEl(null);
    };

    const handleTeamMenuClose = () => {
        setTeamToggleAnchorEl(null);
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.state === NavigationPanelStates.open,
                [classes.drawerClose]: !(props.state === NavigationPanelStates.open)
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.state === NavigationPanelStates.open,
                    [classes.drawerClose]: !(props.state === NavigationPanelStates.open)
                })
            }}
            open={props.state === NavigationPanelStates.open}
        >
            <div className={classes.toolbar}>
                <IconButton style={{ color: "#fff" }} onClick={props.handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <div className={classes.roleContainer}>
                    <AccessibilityNewIcon className={classes.itemIcon} />
                    <div className={classes.labelContainer}>
                        <Typography className={classes.primaryLabel}>Profile Type</Typography>
                        <Typography className={classes.secondaryLabel}>
                            {props.currentUser.permissions.label}
                        </Typography>
                    </div>
                </div>
                <Divider light></Divider>
                <Link className={classes.link} to={myProfilePath}>
                    <ListItem
                        button
                        key={profilePageName}
                        selected={props.location.pathname == myProfilePath}
                    >
                        <ListItemIcon className={classes.itemIcon}>
                            <PersonIcon></PersonIcon>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={profilePageName}
                        />
                    </ListItem>
                </Link>
                {props.currentUser.permissions.pages.roster && (
                    <Link className={classes.link} to={rosterPath}>
                        <ListItem
                            button
                            key={rosterPageName}
                            selected={props.location.pathname == rosterPath}
                        >
                            <ListItemIcon className={classes.itemIcon}>
                                <GroupIcon></GroupIcon>
                            </ListItemIcon>
                            <ListItemText
                                className={classes.drawerListItemText}
                                primary={rosterPageName}
                            />
                        </ListItem>
                    </Link>
                )}
                {props.currentUser.permissions.pages.logging && (
                    <Link className={classes.link} to={injuryLoggingPath}>
                        <ListItem
                            button
                            key={injuryLoggingPageName}
                            selected={props.location.pathname == injuryLoggingPath}
                        >
                            <ListItemIcon className={classes.itemIcon}>
                                <DescriptionIcon></DescriptionIcon>
                            </ListItemIcon>
                            <ListItemText
                                className={classes.drawerListItemText}
                                primary={injuryLoggingPageName}
                            />
                        </ListItem>
                    </Link>
                )}
                {props.currentUser.permissions.pages.injuries && (
                    <Link className={classes.link} to={injuriesPath}>
                        <ListItem
                            button
                            key={injuriesPageName}
                            selected={props.location.pathname == injuriesPath}
                        >
                            <ListItemIcon className={classes.itemIcon}>
                                <HealingIcon></HealingIcon>
                            </ListItemIcon>
                            <ListItemText
                                className={classes.drawerListItemText}
                                primary={injuriesPageName}
                            />
                        </ListItem>
                    </Link>
                )}
                {props.currentUser.permissions.pages.rosterManagement && (
                    <Link className={classes.link} to={rosterManagementPath}>
                        <ListItem
                            button
                            key={rosterManagementPageName}
                            selected={props.location.pathname == rosterManagementPath}
                        >
                            <ListItemIcon className={classes.itemIcon}>
                                <SettingsIcon></SettingsIcon>
                            </ListItemIcon>
                            <ListItemText
                                className={classes.drawerListItemText}
                                primary={rosterManagementPageName}
                            />
                        </ListItem>
                    </Link>
                )}
                <Divider light></Divider>
                <ListItem button className={classes.teamToggleButton}>
                    <List component="nav" className={classes.teamToggleList}>
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="team-menu"
                            onClick={handleClickTeamToggle}
                        >
                            <ListItemIcon className={classes.itemIcon}>
                                <NavigateNextIcon></NavigateNextIcon>
                            </ListItemIcon>
                            <ListItemText
                                className={classes.teamToggleListItem}
                                disableTypography
                                primary={
                                    <Typography className={classes.primaryLabel}>
                                        Team Selection
                                    </Typography>
                                }
                                secondary={
                                    <Typography className={classes.secondaryLabel}>
                                        {props.selectedTeam.name +
                                            " - " +
                                            props.selectedTeam.season}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                    <Menu
                        id="team-menu"
                        anchorEl={teamToggleAnchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        keepMounted
                        open={Boolean(teamToggleAnchorEl)}
                        onClose={handleTeamMenuClose}
                    >
                        {props.teams.map((option, index) => (
                            <MenuItem
                                key={option.name}
                                selected={option === props.selectedTeam}
                                onClick={event => handleTeamClick(event, index)}
                            >
                                {option.name + " - " + option.season}
                            </MenuItem>
                        ))}
                    </Menu>
                </ListItem>
            </List>
        </Drawer>
    );
}

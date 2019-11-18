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
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import DescriptionIcon from "@material-ui/icons/Description";
import HealingIcon from "@material-ui/icons/Healing";
import SettingsIcon from "@material-ui/icons/Settings";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import clsx from "clsx";
import { Link, RouteComponentProps } from "react-router-dom";
import { navigationPanelStyles } from "../styles/react/NavigationPanelStyle";
import { NavigationPanelStates, Team, Athlete } from "../util/types";
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
    selectedTeam: Team;
    setSelectedTeam: any;
}

// TODO: Have to change this to a Redux state hookup as we probably want this to live on the user object
const options = [
    {
        name: "Team 1",
        athletes: [
            { id: "1", name: "Athlete 1" },
            { id: "2", name: "Athlete 2" }
        ] as Athlete[]
    },
    { name: "Team 2", athletes: [] as Athlete[] }
];

export default function NavigationPanel(
    props: NavigationPanelProps & RouteComponentProps
) {
    const classes = navigationPanelStyles({});
    const [
        teamToggleAnchorEl,
        setTeamToggleAnchorEl
    ] = React.useState<null | HTMLElement>(null);

    const handleClickTeamToggle = (event: React.MouseEvent<HTMLElement>) => {
        setTeamToggleAnchorEl(event.currentTarget);
    };

    const handleTeamClick = (
        _: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        props.setSelectedTeam(options[index]);
        setTeamToggleAnchorEl(null);
    };

    const handleTeamMenuClose = () => {
        setTeamToggleAnchorEl(null);
    };

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
                    <ListItem
                        button
                        key={homePageName}
                        selected={props.location.pathname == homePath}
                    >
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
                    <ListItem
                        button
                        key={profilePageName}
                        selected={props.location.pathname == profilePath}
                    >
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
                    <ListItem
                        button
                        key={rosterPageName}
                        selected={props.location.pathname == rosterPath}
                    >
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
                    <ListItem
                        button
                        key={injuryLoggingPageName}
                        selected={props.location.pathname == injuryLoggingPath}
                    >
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
                    <ListItem
                        button
                        key={injuriesPageName}
                        selected={props.location.pathname == injuriesPath}
                    >
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
                    <ListItem
                        button
                        key={rosterManagementPageName}
                        selected={
                            props.location.pathname == rosterManagementPath
                        }
                    >
                        <ListItemIcon>
                            <SettingsIcon></SettingsIcon>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.drawerListItemText}
                            primary={rosterManagementPageName}
                        />
                    </ListItem>
                </Link>
                <Divider light></Divider>
                <ListItem button className={classes.teamToggleButton}>
                    <List component="nav" className={classes.teamToggleList}>
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="team-menu"
                            onClick={handleClickTeamToggle}
                        >
                            <ListItemIcon>
                                <NavigateNextIcon></NavigateNextIcon>
                            </ListItemIcon>
                            <ListItemText
                                className={classes.teamToggleListItem}
                                primary="Team Selection"
                                secondary={props.selectedTeam.name}
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
                        {options.map((option, index) => (
                            <MenuItem
                                key={option.name}
                                selected={option === props.selectedTeam}
                                onClick={event => handleTeamClick(event, index)}
                            >
                                {option.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </ListItem>
            </List>
        </Drawer>
    );
}

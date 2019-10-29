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
import { topBarStyles } from "../styles/react/TopBarStyle";

interface TopBarProps {
    state: NavigationPanelStates;
    handleDrawerClose: any;
    handleDrawerOpen: any;
}

export default function TopBar(props: TopBarProps) {
    const classes = topBarStyles({});

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]:
                        props.state === NavigationPanelStates.open
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            props.state === NavigationPanelStates.open &&
                                classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Athlete's Aid
                    </Typography>
                </Toolbar>
            </AppBar>
            <NavigationPanel
                state={props.state}
                handleDrawerClose={props.handleDrawerClose}
            />
        </div>
    );
}

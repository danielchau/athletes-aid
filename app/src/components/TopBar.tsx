import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { NavigationPanelStates } from "../util/types";
import { topBarStyles } from "../styles/react/TopBarStyle";
// @ts-ignore
import Logo from "../util/logo.png";

interface TopBarProps {
    state: NavigationPanelStates;
    handleDrawerOpen: any;
    handleDrawerClose: any;
}

export default function TopBar(props: TopBarProps) {
    const classes = topBarStyles({});

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={
                            props.state === NavigationPanelStates.open
                                ? props.handleDrawerClose
                                : props.handleDrawerOpen
                        }
                        edge="start"
                        className={classes.menuButton}
                    >
                        {props.state === NavigationPanelStates.open ? (
                            <ChevronLeftIcon />
                        ) : (
                            <MenuIcon />
                        )}
                    </IconButton>
                    <div className={classes.appLogoContainer}>
                        <img
                            className={classes.logo}
                            src="https://s3.amazonaws.com/streamlineathletes.com/assets/programs/22/university-british-columbia_track-field_thunderbirds_logo.png"
                        />
                        <img className={classes.appLogo} src={Logo} />
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SearchIcon from "@material-ui/icons/Search";
import { NavigationPanelStates, Team, Athlete } from "../util/types";
import { topBarStyles } from "../styles/react/TopBarStyle";
import { TextField } from "@material-ui/core";
import Autocomplete, { GetTagProps } from "@material-ui/lab/Autocomplete";
// @ts-ignore
import Logo from "../util/logo.png";
import { profilePath } from "../constants/constants";

interface TopBarProps {
    state: NavigationPanelStates;
    handleDrawerOpen: any;
    handleDrawerClose: any;
    selectedTeam: Team;
}

export default function TopBar(props: TopBarProps) {
    const classes = topBarStyles({});
    const [autocompleteValue, setAutocompleteValue] = React.useState<string>(
        ""
    );
    const [autocompleteOpen, setAutocompleteOpen] = React.useState<boolean>(
        false
    );

    const onAutocompleteInputChange = (_: any, value: string) => {
        setAutocompleteValue(value);
        if (value != "") {
            setAutocompleteOpen(true);
        } else {
            setAutocompleteOpen(false);
        }
    };

    const onAutocompleteChange = (_: React.ChangeEvent<{}>, value: Athlete) => {
        if (!!value) {
            window.location.href = profilePath;
            console.log(value.name);
        }
    };

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
                            <SearchIcon color="secondary" />
                        </div>
                        <Autocomplete
                            id="athlete-select"
                            options={props.selectedTeam.athletes}
                            getOptionLabel={(option: Athlete) => option.name}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "off"
                                    }}
                                    variant="outlined"
                                    placeholder="Search Athlete..."
                                />
                            )}
                            autoComplete
                            disableOpenOnFocus
                            onInputChange={onAutocompleteInputChange}
                            open={autocompleteOpen}
                            onChange={onAutocompleteChange}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

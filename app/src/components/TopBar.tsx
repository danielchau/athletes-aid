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
import Autocomplete, { RenderOptionState } from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
// @ts-ignore
import Logo from "../util/logo.png";
import { profilePath } from "../constants/constants";

interface TopBarProps {
    state: NavigationPanelStates;
    handleDrawerOpen: any;
    handleDrawerClose: any;
    selectedTeam: Team;
    setSelectedAthlete: (id: string) => void;
}

export default function TopBar(props: TopBarProps) {
    const classes = topBarStyles({});
    const [autocompleteValue, setAutocompleteValue] = React.useState<string>("");
    const [autocompleteOpen, setAutocompleteOpen] = React.useState<boolean>(false);

    const onAutocompleteInputChange = (event: any, value: string) => {
        if (!!event) {
            if (event.type == "blur") {
                setAutocompleteOpen(false);
            } else if (event.type == "click" || (event.type == "keydown" && event.keyCode == 13)) {
                let selectedAthlete = props.selectedTeam.athletes.filter(a => value == a.name);
                if (selectedAthlete.length > 0) {
                    props.setSelectedAthlete(selectedAthlete[0].id);
                }
            } else {
                if (autocompleteValue != value) {
                    setAutocompleteValue(value);
                    if (value != "" && !autocompleteOpen) {
                        setAutocompleteOpen(true);
                    } else if (value == "" && autocompleteOpen) {
                        setAutocompleteOpen(false);
                    }
                }
            }
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
                            renderOption={(option: Athlete, state: RenderOptionState) => (
                                <Link className={classes.option} to={profilePath}>
                                    {option.name}
                                </Link>
                            )}
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
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

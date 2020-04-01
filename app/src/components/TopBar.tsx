import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SearchIcon from "@material-ui/icons/Search";
import { NavigationPanelStates, Team, Athlete, User } from "../util/types";
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
    currentUser: User;
    currentRoster: Athlete[];
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}

/**
 * Top Bar is a consistent component of the application that is on the very top.
 * It has the application logo and name and a search bar to search for athletes on the top right.
 * @param props
 */
export default function TopBar(props: TopBarProps) {
    const classes = topBarStyles({});
    const [autocompleteValue, setAutocompleteValue] = React.useState<string>("");
    const [autocompleteOpen, setAutocompleteOpen] = React.useState<boolean>(false);
    const [isFetching, setIsFetching] = React.useState<boolean>(false);
    const [isFirstRender, setIsFirstRender] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
        } else {
            if (
                !!props.currentRoster &&
                JSON.stringify(props.currentRoster.map(a => a.id).sort()) !=
                    JSON.stringify(props.selectedTeam.athleteIds.sort())
            ) {
                setIsFetching(true);
                props.getCurrentRoster(props.selectedTeam.athleteIds).then(_ => {
                    setIsFetching(false);
                });
            }
        }
    }, [props.selectedTeam]);

    const onAutocompleteInputChange = (event: any, value: string) => {
        if (!!event) {
            if (event.type == "blur") {
                setAutocompleteOpen(false);
            } else if (event.type == "click" || (event.type == "keydown" && event.keyCode == 13)) {
                let selectedAthlete = props.currentRoster.filter(a => value == a.name);
                if (selectedAthlete.length > 0) {
                    props.setSelectedAthlete(selectedAthlete[0].id);
                }
            } else {
                if (!!!props.currentRoster && !!props.selectedTeam) {
                    setIsFetching(true);
                    props.getCurrentRoster(props.selectedTeam.athleteIds).then(_ => {
                        setIsFetching(false);
                    });
                }
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
                    {props.currentUser.permissions.canSeeSearchBar && (
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon color="secondary" />
                            </div>
                            <Autocomplete
                                id="athlete-select"
                                options={!!props.currentRoster ? props.currentRoster : []}
                                getOptionLabel={(option: Athlete) => option.name}
                                loading={isFetching}
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
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
}

import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InjuriesDataTable from "./InjuriesDataTable";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LinearProgress from "@material-ui/core/LinearProgress";
import { injuriesPageStyles } from "../styles/react/InjuriesPageStyle";
import { AthleteInjuries, Injury, Team, NavigationPanelStates, User, Athlete } from "../util/types";
import clsx from "clsx";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import BodyVisualization from "./BodyVisualization";
import HelpIcon from "@material-ui/icons/Help";
import { Tooltip, Switch, FormControlLabel, IconButton } from "@material-ui/core";
import HelpDialog from "./HelpDialog";
import { injuriesPageName } from "../constants/constants";

interface InjuriesProps {
    athleteInjuries: AthleteInjuries;
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) => AthleteInjuries;
    startingDate: Date;
    endingDate: Date;
    setStartingDate: (date: Date) => void;
    setEndingDate: (date: Date) => void;
    selectedTeam: Team;
    state: NavigationPanelStates;
    currentUser: User;
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}

/**
 * Injuries page displays information regarding injuries within a certain query range.
 * It consists of two date pickers to set the range and simple statistics on the injuries shown.
 * @param props
 */
export default function InjuriesPage(props: InjuriesProps) {
    const classes = injuriesPageStyles({});
    const [injuryOpen, setInjuryOpen] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(false);
    const [showInactive, setShowInactive] = React.useState<boolean>(true);
    const [injuries, setInjuries] = React.useState<Injury[]>(props.athleteInjuries.injuries);
    const [open, setOpen] = React.useState(false);

    /**
     * If athleteInjuries changes then that means the query is done and we can set the fetching
     * progress bar to not show.
     */
    React.useEffect(() => {
        setIsFetching(false);
        if (showInactive) {
            setInjuries(props.athleteInjuries.injuries);
        } else {
            setInjuries(props.athleteInjuries.injuries.filter(i => i.active));
        }
    }, [props.athleteInjuries]);

    /**
     * If the selected team changes and it is a valid name, then fetch for the newly selected teams
     * roster and update the page.
     */
    React.useEffect(() => {
        if (!!props.selectedTeam && props.selectedTeam.name != "") {
            setIsFetching(true);
            props.getAthleteInjuries(props.startingDate, props.endingDate, props.selectedTeam.id);
        }
    }, [props.selectedTeam]);

    const handleInjuryOpen = () => {
        setInjuryOpen(true);
    };

    const handleInjuryClose = () => {
        setInjuryOpen(false);
    };

    const onInjuriesDateChange = () => {
        if (!!props.selectedTeam) {
            setIsFetching(true);
            props.getAthleteInjuries(props.startingDate, props.endingDate, props.selectedTeam.id);
        }
    };

    const onChangeStartingDate = (date: Date) => {
        date.setHours(0, 0, 0, 0);
        props.setStartingDate(date);
    };

    const onChangeEndingDate = (date: Date) => {
        date.setHours(23, 59, 59, 999);
        props.setEndingDate(date);
    };

    const onSwitch = (_: any, checked: boolean) => {
        setShowInactive(checked);
        if (checked) {
            setInjuries(props.athleteInjuries.injuries);
        } else {
            setInjuries(props.athleteInjuries.injuries.filter(i => i.active));
        }
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.drawerOpen]: props.state === NavigationPanelStates.open,
                [classes.drawerClosed]: !(props.state === NavigationPanelStates.open)
            })}
        >
            <Tooltip title="Help">
                <IconButton
                    style={{ position: "absolute", top: "68px", right: "4px" }}
                    onClick={() => setOpen(true)}
                >
                    <HelpIcon />
                </IconButton>
            </Tooltip>
            <HelpDialog open={open} setOpen={setOpen} page={injuriesPageName} />
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.paper}>
                        <form noValidate className={classes.dateTimeContainer}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={classes.dateField}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="starting-date"
                                    label="Starting Date"
                                    value={props.startingDate}
                                    onChange={onChangeStartingDate}
                                />
                                <KeyboardDatePicker
                                    className={classes.dateField}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="ending-date"
                                    label="Ending Date"
                                    value={props.endingDate}
                                    onChange={onChangeEndingDate}
                                />
                            </MuiPickersUtilsProvider>
                            <Tooltip
                                title={
                                    props.startingDate <= props.endingDate
                                        ? "Search athletes in time range"
                                        : "Starting date must be before ending date"
                                }
                            >
                                <Button
                                    variant="outlined"
                                    aria-label="go"
                                    className={classes.dateTimeButton}
                                    onClick={onInjuriesDateChange}
                                    disabled={props.startingDate > props.endingDate}
                                >
                                    Get Injuries
                                    <ArrowForwardIosIcon style={{ paddingLeft: "4px" }} />
                                </Button>
                            </Tooltip>
                            <FormControlLabel
                                style={{ marginLeft: "20px", marginTop: "6px" }}
                                control={<Switch checked={showInactive} onChange={onSwitch} />}
                                label="Show Inactive Injuries"
                            />
                        </form>
                    </Paper>
                    {isFetching && <LinearProgress color="secondary" />}
                </Grid>
                <Grid container spacing={3} xs={12} sm={12} md={6} style={{ margin: "0px" }}>
                    {[
                        [props.athleteInjuries.injuries.length, "Total Filed Reports"],
                        [injuries.filter(i => i.active).length, "Total Active Reports"],
                        [getAverageSeverity(injuries), "Average Severity"],
                        [getTotalPlayersOut(injuries), "Players Out"]
                    ].map(([val, title]) => (
                        <Grid item xs={12} sm={6} md={6}>
                            <Paper className={classes.paper}>
                                <div className={classes.primaryStatisticContainer}>
                                    <div className={classes.primaryStatisticValue}>{val}</div>
                                    <Divider light />
                                    <div className={classes.primaryStatisticLabel}>{title}</div>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Paper className={classes.vizPaper}>
                        <BodyVisualization injuries={injuries} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} style={{ width: "100%" }}>
                    <Paper className={classes.paper} style={{ width: "100%" }}>
                        <InjuriesDataTable
                            injuries={injuries}
                            injuryOpen={injuryOpen}
                            handleInjuryOpen={handleInjuryOpen}
                            handleInjuryClose={handleInjuryClose}
                            getAthleteInjuries={props.getAthleteInjuries}
                            startingDate={props.startingDate}
                            endingDate={props.endingDate}
                            selectedTeam={props.selectedTeam}
                            currentUser={props.currentUser}
                            getCurrentRoster={props.getCurrentRoster}
                        ></InjuriesDataTable>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

/**
 * Calculate the average severity of the injuries provided.
 * @param injuries
 */
function getAverageSeverity(injuries: Injury[]): string {
    if (injuries.length == 0) {
        return "0";
    }
    let sum = 0;
    injuries.forEach(i => (sum += i.severity));
    return (sum / injuries.length).toFixed(1);
}

/**
 * Get the amount of injuries that sideline (out) athletes.
 * @param injuries
 */
function getTotalPlayersOut(injuries: Injury[]): number {
    let addedAthletes = new Set();
    return injuries.filter(i => {
        if (addedAthletes.has(i.athleteName)) {
            return false;
        } else {
            addedAthletes.add(i.athleteName);
            return i.status == "Out";
        }
    }).length;
}

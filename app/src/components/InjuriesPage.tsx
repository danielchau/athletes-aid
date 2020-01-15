import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InjuriesDataTable from "./InjuriesDataTable";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LinearProgress from "@material-ui/core/LinearProgress";
import { injuriesPageStyles } from "../styles/react/InjuriesPageStyle";
import {
    AthleteInjuries,
    Injury,
    Team,
    NavigationPanelStates
} from "../util/types";
import clsx from "clsx";

interface InjuriesProps {
    athleteInjuries: AthleteInjuries;
    getAthleteInjuries: (
        startDate: Date,
        endDate: Date,
        team: string
    ) => AthleteInjuries;
    startingDate: Date;
    endingDate: Date;
    setStartingDate: (date: Date) => void;
    setEndingDate: (date: Date) => void;
    selectedTeam: Team;
    state: NavigationPanelStates;
}

export default function InjuriesPage(props: InjuriesProps) {
    const classes = injuriesPageStyles({});
    const [injuryOpen, setInjuryOpen] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(false);

    React.useEffect(() => {
        setIsFetching(false);
    }, [props.athleteInjuries]);

    React.useEffect(() => {
        setIsFetching(true);
        props.getAthleteInjuries(
            props.startingDate,
            props.endingDate,
            props.selectedTeam.name
        );
    }, [props.selectedTeam]);

    const handleInjuryOpen = () => {
        setInjuryOpen(true);
    };

    const handleInjuryClose = () => {
        setInjuryOpen(false);
    };

    const onInjuriesDateChange = () => {
        setIsFetching(true);
        props.getAthleteInjuries(
            props.startingDate,
            props.endingDate,
            props.selectedTeam.name
        );
    };

    const onChangeStartingDate = (event: any) => {
        props.setStartingDate(new Date(event.target.value));
    };

    const onChangeEndingDate = (event: any) => {
        props.setEndingDate(new Date(event.target.value));
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.drawerOpen]:
                    props.state === NavigationPanelStates.open,
                [classes.drawerClosed]: !(
                    props.state === NavigationPanelStates.open
                )
            })}
        >
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <form noValidate className={classes.dateTimeContainer}>
                            <TextField
                                id="date"
                                label="Starting Date"
                                type="date"
                                defaultValue={
                                    props.startingDate
                                        .toISOString()
                                        .split("T")[0]
                                }
                                className={classes.textField}
                                onChange={onChangeStartingDate}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                id="date"
                                label="Ending Date"
                                type="date"
                                defaultValue={
                                    props.endingDate.toISOString().split("T")[0]
                                }
                                className={classes.textField}
                                onChange={onChangeEndingDate}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <Button
                                variant="outlined"
                                aria-label="go"
                                className={classes.dateTimeButton}
                                onClick={onInjuriesDateChange}
                            >
                                <ArrowForwardIosIcon />
                            </Button>
                        </form>
                    </Paper>
                    {isFetching && <LinearProgress color="secondary" />}
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.primaryStatisticContainer}>
                            <div className={classes.primaryStatisticValue}>
                                {props.athleteInjuries.injuries.length}
                            </div>
                            <Divider light />
                            <div className={classes.primaryStatisticLabel}>
                                Total Filed Reports
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.primaryStatisticContainer}>
                            <div className={classes.primaryStatisticValue}>
                                {
                                    props.athleteInjuries.injuries.filter(
                                        i => i.active
                                    ).length
                                }
                            </div>
                            <Divider light />
                            <div className={classes.primaryStatisticLabel}>
                                Total Active Reports
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.primaryStatisticContainer}>
                            <div className={classes.primaryStatisticValue}>
                                {getAverageSeverity(
                                    props.athleteInjuries.injuries
                                )}
                            </div>
                            <Divider light />
                            <div className={classes.primaryStatisticLabel}>
                                Average Severity
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.primaryStatisticContainer}>
                            <div className={classes.primaryStatisticValue}>
                                {getTotalPlayersOut(
                                    props.athleteInjuries.injuries
                                )}
                            </div>
                            <Divider light />
                            <div className={classes.primaryStatisticLabel}>
                                Players Out
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{ width: "100%" }}>
                    <Paper className={classes.paper} style={{ width: "100%" }}>
                        <InjuriesDataTable
                            injuries={props.athleteInjuries.injuries}
                            injuryOpen={injuryOpen}
                            handleInjuryOpen={handleInjuryOpen}
                            handleInjuryClose={handleInjuryClose}
                        ></InjuriesDataTable>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

function getAverageSeverity(injuries: Injury[]): string {
    if (injuries.length == 0) {
        return "0.0";
    }
    let sum = 0;
    injuries.forEach(i => (sum += i.severity));
    return (sum / injuries.length).toFixed(1);
}

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

import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InjuryDataTable from "./InjuriesDataTable";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { injuriesPageStyles } from "../styles/react/InjuriesPageStyle";
import { AthleteInjuries } from "../util/types";

interface InjuriesProps {
    athleteInjuries: AthleteInjuries;
    getAthleteInjuries: (
        team: string,
        startDate: string,
        endDate: string
    ) => AthleteInjuries;
}

export default function InjuriesPage(props: InjuriesProps) {
    const classes = injuriesPageStyles({});
    const onInjuriesDateChange = () => {
        props.getAthleteInjuries("", "", "");
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <form noValidate className={classes.dateTimeContainer}>
                            <TextField
                                id="date"
                                label="Starting Date"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                id="date"
                                label="Ending Date"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
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
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.primaryStatisticContainer}>
                            <div className={classes.primaryStatisticValue}>
                                10
                            </div>
                            <Divider light />
                            <div className={classes.primaryStatisticLabel}>
                                Statistic 1
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.primaryStatisticContainer}>
                            <div className={classes.primaryStatisticValue}>
                                123
                            </div>
                            <Divider light />
                            <div className={classes.primaryStatisticLabel}>
                                Statistic 2
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.primaryStatisticContainer}>
                            <div className={classes.primaryStatisticValue}>
                                32
                            </div>
                            <Divider light />
                            <div className={classes.primaryStatisticLabel}>
                                Statistic 3
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.primaryStatisticContainer}>
                            <div className={classes.primaryStatisticValue}>
                                321
                            </div>
                            <Divider light />
                            <div className={classes.primaryStatisticLabel}>
                                Statistic 4
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <InjuryDataTable></InjuryDataTable>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

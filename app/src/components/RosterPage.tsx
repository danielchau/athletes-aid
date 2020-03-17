import React from "react";
import { rosterPageStyles } from "../styles/react/RosterPageStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Athlete, Team } from "../util/types";
import { profilePath, rosterPageName } from "../constants/constants";
import { Link, RouteComponentProps } from "react-router-dom";
import FetchingScreen from "./FetchingScreen";
import HelpIcon from "@material-ui/icons/Help";
import { Tooltip, IconButton } from "@material-ui/core";
import HelpDialog from "./HelpDialog";

interface RosterPageProps {
    selectedTeam: Team;
    setSelectedAthlete: (id: string) => void;
    currentRoster: Athlete[];
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}

/**
 * Roster Page dispalys all of the athletes on the selected team and provides navigation to the
 * athletes profiles.
 * @param props
 */
export default function RosterPage(props: RosterPageProps & RouteComponentProps) {
    const classes = rosterPageStyles({});
    const [isFetching, setIsFetching] = React.useState<boolean>(true);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (!!props.currentRoster) {
            setIsFetching(false);
        } else {
            setIsFetching(true);
            props.getCurrentRoster(props.selectedTeam.athleteIds).then(_ => {
                setIsFetching(false);
            });
        }
    }, []);

    React.useEffect(() => {
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
    }, [props.selectedTeam]);

    const getLastInjuryDate = (athlete: Athlete) => {
        if (athlete.injuries.length <= 0) {
            return "N/A";
        }
        const lastInjury = athlete.injuries[athlete.injuries.length - 1];
        return lastInjury.injuryDate.toISOString().split("T")[0];
    };

    const getLastInjuryDetails = (athlete: Athlete) => {
        if (athlete.injuries.length <= 0) {
            return "N/A";
        }
        const lastInjury = athlete.injuries[athlete.injuries.length - 1];
        return lastInjury.injuryType + " / " + lastInjury.locationOnBody;
    };

    const getIsOut = (athlete: Athlete) => {
        if (athlete.injuries.length <= 0) {
            return "Active";
        }
        const lastInjury = athlete.injuries[athlete.injuries.length - 1];
        if (!lastInjury.active) {
            return "Active";
        }
        return lastInjury.status;
    };

    const onTableRowClick = (id: string) => {
        props.setSelectedAthlete(id);
    };

    return (
        <div className={classes.root}>
            {isFetching || !!!props.currentRoster ? (
                <FetchingScreen />
            ) : (
                <Paper className={classes.tableContainer}>
                    <Tooltip title="Help">
                        <IconButton
                            style={{ position: "absolute", top: "68px", right: "4px" }}
                            onClick={() => setOpen(true)}
                        >
                            <HelpIcon />
                        </IconButton>
                    </Tooltip>
                    <HelpDialog open={open} setOpen={setOpen} page={rosterPageName} />
                    <div className={classes.tableBodyContainer}>
                        <Table stickyHeader className={classes.tableBody}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>Athlete Name</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Last Injury Date</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Last Injury Details</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Status</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.currentRoster.map(row => (
                                    <TableRow
                                        // @ts-ignore
                                        component={Link}
                                        to={profilePath}
                                        className={classes.tableRow}
                                        hover
                                        key={row.id}
                                        onClick={() => onTableRowClick(row.id)}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {getLastInjuryDate(row)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {getLastInjuryDetails(row)}
                                        </TableCell>
                                        <TableCell align="right">{getIsOut(row)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            )}
        </div>
    );
}

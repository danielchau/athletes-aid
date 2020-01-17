import React from "react";
import { rosterPageStyles } from "../styles/react/RosterPageStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Athlete, Team } from "../util/types";
import { profilePath } from "../constants/constants";

interface RosterPageProps {
    selectedTeam: Team;
}

export default function RosterPage(props: RosterPageProps) {
    const classes = rosterPageStyles({});
    const athletes: Athlete[] = props.selectedTeam.athletes;

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
            return "N/A";
        }
        const lastInjury = athlete.injuries[athlete.injuries.length - 1];
        if (!lastInjury.active) {
            return "N/A";
        }
        return lastInjury.status;
    };

    const handleRowClick = (_: React.MouseEvent<unknown>, name: string) => {
        window.location.href = profilePath;
        console.log(name);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.tableContainer}>
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
                            {athletes.map(row => (
                                <TableRow
                                    className={classes.tableRow}
                                    hover
                                    key={row.name}
                                    onClick={event =>
                                        handleRowClick(event, row.id)
                                    }
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
                                    <TableCell align="right">
                                        {getIsOut(row)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        </div>
    );
}

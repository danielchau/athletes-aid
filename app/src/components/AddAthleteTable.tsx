import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AthleteProfile } from "../util/types";
import { profilePath } from "../constants/constants";
import { addAthleteTableStyles } from "../styles/react/AddAthleteTableStyles";

interface AddAthleteTableProps {
    athletes: AthleteProfile[];
}

export default function AddAthleteTable(props: AddAthleteTableProps) {
    const classes = addAthleteTableStyles({});
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
                                    <b>Birthdate</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>School Year</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Gender</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Weight (lbs)</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Height (inches)</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Email</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Cell Phone</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Home Phone</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Emergency Contact Name</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Emergency Contact Cell Phone</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Emergency Contact Home Phone</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Emergency Contact Email</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.athletes.map(row => (
                                <TableRow
                                    className={classes.tableRow}
                                    hover
                                    key={row.id}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.birthdate}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.schoolYear}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.gender}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.weight}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.height}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.email}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.cellPhone}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.homePhone}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.emergencyContact.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.emergencyContact.cellPhone}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.emergencyContact.homePhone}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.emergencyContact.email}
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

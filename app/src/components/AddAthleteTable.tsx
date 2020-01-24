import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AthleteProfile, ListAthlete, Athlete } from "../util/types";
import { addAthleteTableStyles } from "../styles/react/AddAthleteTableStyles";
import { IconButton } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { addAthleteToDb } from "../actions/AthleteAction";

interface AddAthleteTableProps {
    athletes: AthleteProfile[];
    rosterAthletes: Athlete[];
    allAthletes: ListAthlete[];
    setAllAthletes: any;
}

export default function AddAthleteTable(props: AddAthleteTableProps) {
    const classes = addAthleteTableStyles({});

    const doesPlayerExist = (athlete: AthleteProfile) => {
        if (props.rosterAthletes.filter(a => a.id == athlete.id).length > 0) {
            return (
                <IconButton disabled style={{ color: "#db2e2e" }}>
                    <HighlightOffIcon />
                </IconButton>
            );
        } else if (
            props.allAthletes.filter(
                a => a.name == athlete.name && a.birthdate == athlete.birthdate
            ).length > 0
        ) {
            return (
                <IconButton disabled style={{ color: "#0055B7" }}>
                    <DoneIcon />
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={() => addAthlete(athlete)} style={{ color: "#F2A71E" }}>
                    <PersonAddIcon />
                </IconButton>
            );
        }
    };

    const addAthlete = (athlete: AthleteProfile) => {
        addAthleteToDb(athlete).then((athleteId: string | null) => {
            if (athleteId != null) {
                props.setAllAthletes(
                    props.allAthletes.concat({
                        id: athleteId,
                        name: athlete.name,
                        birthdate: athlete.birthdate
                    })
                );
            }
        });
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.tableContainer}>
                <div className={classes.tableBodyContainer}>
                    <Table stickyHeader className={classes.tableBody}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Athlete Exists?</b> (No? click icon to register)
                                </TableCell>
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
                                <TableRow className={classes.tableRow} hover key={row.id}>
                                    <TableCell align="left" component="th" scope="row">
                                        {doesPlayerExist(row)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.birthdate}</TableCell>
                                    <TableCell align="right">{row.schoolYear}</TableCell>
                                    <TableCell align="right">{row.gender}</TableCell>
                                    <TableCell align="right">{row.weight}</TableCell>
                                    <TableCell align="right">{row.height}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.cellPhone}</TableCell>
                                    <TableCell align="right">{row.homePhone}</TableCell>
                                    <TableCell align="right">{row.emergencyContact.name}</TableCell>
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

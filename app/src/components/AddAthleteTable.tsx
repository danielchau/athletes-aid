import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AthleteProfile, ListAthlete, Athlete, User } from "../util/types";
import { addAthleteTableStyles } from "../styles/react/AddAthleteTableStyles";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { addAthleteToDb } from "../actions/AthleteAction";

interface AddAthleteTableProps {
    athletes: AthleteProfile[];
    rosterAthletes: Athlete[];
    allAthletes: ListAthlete[];
    setAllAthletes: any;
    getTeams: (id: string) => void;
    currentUser: User;
}

/**
 * Add Athlete Table is used in the roster management page to display athletes that are uploaded
 * from the bulk addition spreadsheet.
 * @param props
 */
export default function AddAthleteTable(props: AddAthleteTableProps) {
    const classes = addAthleteTableStyles({});

    /**
     * Determines if the player exists on the team or the database and renders an appropriate icon
     * displaying the state.
     * @param athlete
     */
    const doesPlayerExist = (athlete: AthleteProfile) => {
        let athleteInDatabase = props.allAthletes.filter(
            a => a.name == athlete.name && a.birthdate == athlete.birthdate
        );

        if (athleteInDatabase.length > 0) {
            if (props.rosterAthletes.filter(a => a.id == athleteInDatabase[0].id).length > 0) {
                // Render an (X) if the player already exists on the team
                return (
                    <IconButton disabled style={{ color: "#db2e2e" }}>
                        <HighlightOffIcon />
                    </IconButton>
                );
            }
            // Render a checkmark if the player is not on the team but is already in the database
            return (
                <IconButton disabled style={{ color: "#0055B7" }}>
                    <DoneIcon />
                </IconButton>
            );
        } else {
            // Render a person add icon if the player is not yet in the database.
            // This icon is clickable to add the athlete to the database.
            return (
                <IconButton onClick={() => addAthlete(athlete)} style={{ color: "#F2A71E" }}>
                    <PersonAddIcon />
                </IconButton>
            );
        }
    };

    /**
     * Add an athlete to the database that doesn't exist on it yet.
     * @param athlete: AthletProfile that contains necessary information to create entry in db.
     */
    const addAthlete = (athlete: AthleteProfile) => {
        addAthleteToDb(
            athlete,
            props.currentUser.firstName + " " + props.currentUser.lastName
        ).then((athleteId: string | null) => {
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
                                    <b>Status</b>
                                    <Tooltip
                                        classes={{ tooltip: classes.tooltip }}
                                        title={
                                            <React.Fragment>
                                                <div style={{ display: "flex", padding: "4px" }}>
                                                    <DoneIcon style={{ color: "#0055B7" }} />
                                                    <Typography color="inherit">
                                                        : Athlete in database, not on team
                                                    </Typography>
                                                </div>
                                                <div style={{ display: "flex", padding: "4px" }}>
                                                    <PersonAddIcon style={{ color: "#F2A71E" }} />
                                                    <Typography color="inherit">
                                                        : Athlete not in database or team
                                                    </Typography>
                                                </div>
                                                <div style={{ display: "flex", padding: "4px" }}>
                                                    <HighlightOffIcon
                                                        style={{ color: "#db2e2e" }}
                                                    />
                                                    <Typography color="inherit">
                                                        : Athlete already on team
                                                    </Typography>
                                                </div>
                                            </React.Fragment>
                                        }
                                    >
                                        <IconButton
                                            size="small"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                marginLeft: "4px"
                                            }}
                                        >
                                            <HelpOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <b>Athlete Name</b>
                                </TableCell>
                                {[
                                    "Birthdate",
                                    "School Year",
                                    "Gender",
                                    "Weight (lbs)",
                                    "Height (inches)",
                                    "Email",
                                    "Cell Phone",
                                    "Home Phone",
                                    "Emergency Contact Name",
                                    "Emergency Contact Phone",
                                    "Emergency Contact Email"
                                ].map((val: string) => (
                                    <TableCell align="right">
                                        <b>{val}</b>
                                    </TableCell>
                                ))}
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
                                    {[
                                        row.birthdate,
                                        row.schoolYear,
                                        row.gender,
                                        row.weight,
                                        row.height,
                                        row.email,
                                        row.cellPhone,
                                        row.homePhone,
                                        row.emergencyContact.name,
                                        row.emergencyContact.phone,
                                        row.emergencyContact.email
                                    ].map((val: string) => (
                                        <TableCell align="right">{val}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        </div>
    );
}

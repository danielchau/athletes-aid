import React from "react";
import { rosterPageStyles } from "../styles/react/RosterPageStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { User, ListAthlete } from "../util/types";
import FetchingScreen from "./FetchingScreen";
import { getAllAthletes } from "../actions/AthleteAction";
import {
    TrainerPermissions,
    CoachPermissions,
    AdminPermissions,
    UserPermissions,
    AthletePermissions
} from "../util/permissions";
import { FormControl, Select, MenuItem, TextField } from "@material-ui/core";

interface UserManagementPageProps {
    currentUser: User;
}

/**
 * Roster Page dispalys all of the athletes on the selected team and provides navigation to the
 * athletes profiles.
 * @param props
 */
export default function UserManagementPage(props: UserManagementPageProps) {
    const classes = rosterPageStyles({});
    const [users, setUsers] = React.useState<User[]>([]);
    const [isFirstRender, setIsFirstRender] = React.useState<boolean>(true);
    const [isFetching, setIsFetching] = React.useState<boolean>(true);
    const [autocompleteVal, setAutocompleteVal] = React.useState<string>("");
    const [allUsers, setAllUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            // Have to change this call once we have a get all users call
            let permissionsOptions = [
                AdminPermissions,
                TrainerPermissions,
                AthletePermissions,
                CoachPermissions
            ];
            getAllAthletes(props.currentUser.athleteProfile.id).then((users: ListAthlete[]) => {
                let tempUsers = users.map(u => ({
                    athleteProfile: {
                        id: u.id,
                        profilePicture: "",
                        name: u.name,
                        birthdate: u.birthdate,
                        schoolYear: 0,
                        gender: "",
                        weight: 0,
                        height: 0,
                        email: "",
                        cellPhone: "",
                        homePhone: "",
                        healthCardNumber: "",
                        studentNumber: "",
                        emergencyContact: {
                            id: "",
                            name: "",
                            phone: "",
                            email: ""
                        },
                        files: [],
                        injuries: []
                    },
                    permissions: permissionsOptions[Math.round(Math.random() * 3)]
                }));
                setUsers(tempUsers);
                setAllUsers(tempUsers);
                setIsFetching(false);
            });
        }
    }, []);

    const handleAutocompleteChange = (event: React.ChangeEvent<{ value: string }>) => {
        let value = event.target.value;

        setAutocompleteVal(value);

        var reg = new RegExp(
            value
                .split("")
                .join("\\w*")
                .replace(/\W/, ""),
            "i"
        );
        let newUsers = allUsers.filter((a: User) => {
            if (a.athleteProfile.name.match(reg)) {
                return a;
            }
        });

        setUsers(newUsers);
    };

    const onSelectChange = (event: React.ChangeEvent<{ value: string }>) => {
        // Send off permissions type here
    };

    return (
        <div className={classes.root}>
            <TextField
                label="Search User..."
                variant="outlined"
                fullWidth
                value={autocompleteVal}
                onChange={handleAutocompleteChange}
                className={classes.searchBar}
            />
            {isFetching ? (
                <FetchingScreen />
            ) : (
                <Paper className={classes.tableContainer}>
                    <div className={classes.tableBodyContainer}>
                        <Table stickyHeader className={classes.tableBody}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>Name</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Role</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(row => (
                                    <TableRow
                                        className={classes.tableRow}
                                        key={row.athleteProfile.id}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.athleteProfile.name}
                                        </TableCell>
                                        <TableCell align="right" style={{ padding: "0px" }}>
                                            <FormControl
                                                variant="outlined"
                                                style={{
                                                    width: "150px",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <Select
                                                    id={row.athleteProfile.name}
                                                    value={row.permissions.label}
                                                    classes={{
                                                        selectMenu: classes.dropdownMenu
                                                    }}
                                                    onChange={onSelectChange}
                                                >
                                                    {[
                                                        AdminPermissions,
                                                        TrainerPermissions,
                                                        CoachPermissions,
                                                        AthletePermissions
                                                    ].map((perm: UserPermissions, i: number) => (
                                                        <MenuItem key={i} value={perm.label}>
                                                            {perm.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
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

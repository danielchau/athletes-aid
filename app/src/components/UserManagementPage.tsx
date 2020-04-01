import React from "react";
import { rosterPageStyles } from "../styles/react/RosterPageStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { User, Team } from "../util/types";
import FetchingScreen from "./FetchingScreen";
import {
    TrainerPermissions,
    CoachPermissions,
    AdminPermissions,
    UserPermissions
} from "../util/permissions";
import {
    FormControl,
    Select,
    MenuItem,
    TextField,
    Tooltip,
    IconButton,
    Input
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import HelpDialog from "./HelpDialog";
import { userManagementPageName } from "../constants/constants";
import Chip from "@material-ui/core/Chip";
import {
    changeRoleForUser,
    changeTeamsForUser,
    getAllUsers,
    deleteUser
} from "../actions/UserAction";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import AddUserDialog from "./AddUserDialog";
import ErrorDialog from "./ErrorDialog";
import { fetchTeamsEndpoint } from "../actions/TeamAction";

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
    const [open, setOpen] = React.useState(false);
    const [openAddUser, setOpenAddUser] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [teams, setTeams] = React.useState([]);

    React.useEffect(() => {
        if (isFirstRender) {
            fetchTeamsEndpoint(props.currentUser.permissions).then((t: Team[]) => {
                setTeams(t);
                getAllUsers().then((users: User[] | null) => {
                    if (!!users) {
                        setAllUsers(users);
                        setUsers(users);
                    } else {
                        setOpenError(true);
                    }
                    setIsFirstRender(false);
                    setIsFetching(false);
                });
            });
        }
    }, []);

    React.useEffect(() => {
        console.log(users);
        console.log(allUsers);
    }, [users, allUsers]);

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
            let athleteName = a.firstName + " " + a.lastName;
            if (athleteName.match(reg)) {
                return a;
            }
        });

        setUsers(newUsers);
    };

    const onSelectChange = (event: React.ChangeEvent<{ value: string }>, user: User) => {
        changeRoleForUser(user.cwl, event.target.value).then((role: string | null) => {
            if (!!role) {
                let tempUsers = allUsers;
                tempUsers = tempUsers.map(u => {
                    if (user.cwl == u.cwl) {
                        switch (role) {
                            case "admin":
                                u.permissions = AdminPermissions;
                                break;
                            case "trainer":
                                u.permissions = TrainerPermissions;
                                break;
                            default:
                                u.permissions = CoachPermissions;
                                break;
                        }
                    }
                    return u;
                });
                setUsers(tempUsers);
                setAllUsers(tempUsers);
            } else {
                setOpenError(true);
            }
        });
    };

    const onTeamChange = (event: React.ChangeEvent<{ value: string[] }>, user: User) => {
        let teamsMap = new Map();
        teams.forEach(t => teamsMap.set(t.name + " - " + t.season, t.id));

        changeTeamsForUser(
            user.cwl,
            event.target.value.filter(t => !!t).map(t => teamsMap.get(t))
        ).then((teams: string[] | null) => {
            if (!!teams) {
                let tempUsers = allUsers;
                tempUsers = tempUsers.map(u => {
                    if (user.cwl == u.cwl) u.teams = teams;
                    return u;
                });
                setUsers(tempUsers);
                setAllUsers(tempUsers);
            } else {
                setOpenError(true);
            }
        });
    };

    const onDeleteUser = (user: User) => {
        deleteUser(user.cwl).then((response: string) => {
            if (!!response) {
                let tempUsers = allUsers.slice();
                let deleteIndex = null;
                for (let i = 0; i < tempUsers.length; i++) {
                    if (tempUsers[i].cwl == user.cwl) {
                        deleteIndex = i;
                    }
                }
                if (!!deleteIndex) {
                    tempUsers.splice(deleteIndex);
                }
                setUsers(tempUsers);
                setAllUsers(tempUsers);
            } else {
                setOpenError(true);
            }
        });
    };

    const getUserTeamNames = (t: string[]) => {
        let teamMap = new Map();
        teams.forEach(t => teamMap.set(t.id, t.name + " - " + t.season));
        return t.map(t => teamMap.get(t));
    };

    return (
        <div className={classes.root}>
            <ErrorDialog open={openError} setOpen={setOpenError} />
            <div className={classes.searchBarContainer}>
                <TextField
                    label="Search User..."
                    variant="outlined"
                    fullWidth
                    value={autocompleteVal}
                    onChange={handleAutocompleteChange}
                    className={classes.searchBar}
                />
                <Tooltip title="Add User">
                    <IconButton
                        onClick={() => setOpenAddUser(true)}
                        style={{
                            marginLeft: "8px",
                            marginBottom: "16px",
                            height: "60px",
                            width: "60px"
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <AddUserDialog
                    open={openAddUser}
                    setOpen={setOpenAddUser}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    setOpenError={setOpenError}
                    setUsers={setUsers}
                />
            </div>
            {isFetching ? (
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
                    <HelpDialog open={open} setOpen={setOpen} page={userManagementPageName} />
                    <div className={classes.tableBodyContainer}>
                        <Table stickyHeader className={classes.tableBody}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>CWL / Name</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Teams</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Role</b>
                                    </TableCell>
                                    <TableCell align="right" style={{ width: "75px" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(row => (
                                    <TableRow className={classes.tableRow} key={row.cwl}>
                                        <TableCell component="th" scope="row">
                                            {row.cwl + " / " + row.firstName + " " + row.lastName}
                                        </TableCell>
                                        <TableCell align="right" style={{ padding: "0px" }}>
                                            <FormControl
                                                variant="outlined"
                                                style={{
                                                    width: "300px",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <Select
                                                    id="team-chips"
                                                    multiple
                                                    value={getUserTeamNames(row.teams)}
                                                    onChange={(
                                                        evt: React.ChangeEvent<{ value: string[] }>
                                                    ) => onTeamChange(evt, row)}
                                                    input={<Input id="select-multiple-chip" />}
                                                    renderValue={selected => (
                                                        <div className={classes.chips}>
                                                            {(selected as string[]).map(value => (
                                                                <Chip
                                                                    key={value}
                                                                    label={value}
                                                                    className={classes.chip}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                >
                                                    {teams.map(team => (
                                                        <MenuItem
                                                            key={team.id}
                                                            value={team.name + " - " + team.season}
                                                        >
                                                            {team.name + " - " + team.season}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
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
                                                    id={row.firstName + " " + row.lastName}
                                                    value={row.permissions.label}
                                                    classes={{
                                                        selectMenu: classes.dropdownMenu
                                                    }}
                                                    onChange={(
                                                        evt: React.ChangeEvent<{ value: string }>
                                                    ) => onSelectChange(evt, row)}
                                                    disabled={row.cwl == props.currentUser.cwl}
                                                >
                                                    {[
                                                        AdminPermissions,
                                                        TrainerPermissions,
                                                        CoachPermissions
                                                    ].map((perm: UserPermissions, i: number) => (
                                                        <MenuItem key={i} value={perm.label}>
                                                            {perm.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.cwl != props.currentUser.cwl && (
                                                <Tooltip title="Delete User">
                                                    <IconButton
                                                        style={{ color: "#a83232" }}
                                                        onClick={() => onDeleteUser(row)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
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

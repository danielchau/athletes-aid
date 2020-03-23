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
    UserPermissions,
    AthletePermissions
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

interface UserManagementPageProps {
    currentUser: User;
    teams: Team[];
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

    React.useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            setIsFetching(false);
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
            let athleteName = a.firstName + " " + a.lastName;
            if (athleteName.match(reg)) {
                return a;
            }
        });

        setUsers(newUsers);
    };

    const onSelectChange = (event: React.ChangeEvent<{ value: string }>, user: User) => {
        // Send off permissions type here
    };

    const onTeamChange = (event: React.ChangeEvent<{ value: string }>, user: User) => {
        // Change teams of user
    };

    const getUserTeamNames = (teams: string[]) => {
        let teamMap = new Map();
        props.teams.forEach(t => teamMap.set(t.id, t.name + " - " + t.season));
        return teams.map(t => teamMap.get(t));
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
                                        <b>Name</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Teams</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Role</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(row => (
                                    <TableRow className={classes.tableRow} key={row.cwl}>
                                        <TableCell component="th" scope="row">
                                            {row.firstName + " " + row.lastName}
                                        </TableCell>
                                        <TableCell align="right" style={{ padding: "0px" }}>
                                            <FormControl
                                                variant="outlined"
                                                style={{
                                                    width: "350px",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <Select
                                                    id="team-chips"
                                                    multiple
                                                    value={getUserTeamNames(row.teams)}
                                                    onChange={(
                                                        evt: React.ChangeEvent<{ value: string }>
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
                                                    {props.teams.map(team => (
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

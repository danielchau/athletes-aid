import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
    UserPermissions,
    AdminPermissions,
    TrainerPermissions,
    CoachPermissions
} from "../util/permissions";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { addUser } from "../actions/UserAction";
import { User } from "../util/types";

interface AddUserDialogProps {
    open: boolean;
    setOpen: any;
    allUsers: User[];
    setAllUsers: any;
    setUsers: any;
    setOpenError: any;
}

export default function AddUserDialog(props: AddUserDialogProps) {
    const [cwl, setCwl] = React.useState("");
    const [role, setRole] = React.useState("Coach");

    const onCwlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCwl(event.target.value);
    };

    const onRoleChange = (event: React.ChangeEvent<{ value: string }>) => {
        setRole(event.target.value);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleAddUser = () => {
        addUser(cwl, [], role).then((cwl: string | null) => {
            if (!!cwl) {
                const getPermissions = () => {
                    switch (role) {
                        case "Administrator":
                            return AdminPermissions;
                        case "Trainer":
                            return TrainerPermissions;
                        default:
                            return CoachPermissions;
                    }
                };

                let tempUsers = props.allUsers;
                tempUsers.push({
                    cwl: cwl,
                    firstName: "",
                    lastName: "",
                    permissions: getPermissions(),
                    teams: []
                });
                props.setUsers(tempUsers);
                props.setAllUsers(tempUsers);
                setCwl("");
                setRole("Coach");
                props.setOpen(false);
            } else {
                props.setOpenError(true);
            }
        });
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill out the following information to add a user.
                    </DialogContentText>
                    <TextField
                        value={cwl}
                        onChange={onCwlChange}
                        autoFocus
                        margin="dense"
                        id="cwl"
                        label="CWL ID"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl variant="outlined" fullWidth>
                        <Select id={"form-permissions"} value={role} onChange={onRoleChange}>
                            {[AdminPermissions, TrainerPermissions, CoachPermissions].map(
                                (perm: UserPermissions, i: number) => (
                                    <MenuItem key={i} value={perm.label}>
                                        {perm.label}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddUser} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

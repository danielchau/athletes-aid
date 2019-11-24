import * as React from "react";
import { rosterManagementPageStyles } from "../styles/react/RosterManagementPageStyles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { Team } from "../util/types";

interface RosterManagementPageProps {
    teams: Team[];
}

export default function RosterManagementPage(props: RosterManagementPageProps) {
    const classes = rosterManagementPageStyles({});

    return (
        <div className={classes.root}>
            <Paper className={classes.introPaper}>
                <Typography className={classes.introText}>
                    Edit one of your current teams:
                </Typography>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel id="team-select-label">Team Name</InputLabel>
                    <Select
                        labelWidth={90}
                        id="team-select"
                        value={""}
                        inputProps={{ readOnly: true }}
                    >
                        <MenuItem value="" disabled>
                            Select where injury took place...
                        </MenuItem>
                    </Select>
                </FormControl>
                <Typography className={classes.introText}>
                    or add a new one:
                </Typography>
                <IconButton aria-label="add" className={classes.introButton}>
                    <AddIcon />
                </IconButton>
            </Paper>
            <Paper className={classes.paperContent}>
                <TextField
                    id="team-name"
                    className={classes.textInput}
                    label="Team Name"
                    placeholder="(e.g. Women's Soccer)"
                    margin="normal"
                    variant="outlined"
                    value={""}
                />
                <TextField
                    id="season"
                    className={classes.textInput}
                    label="Season"
                    placeholder="(e.g. 2019/2020)"
                    margin="normal"
                    variant="outlined"
                    value={""}
                />
            </Paper>
        </div>
    );
}

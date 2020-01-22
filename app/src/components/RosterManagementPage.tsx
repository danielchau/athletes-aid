import * as React from "react";
import { rosterManagementPageStyles } from "../styles/react/RosterManagementPageStyles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Athlete, Team } from "../util/types";
import MyDropzone from "./Dropzone";

interface RosterManagementPageProps {
    teams: Team[];
}

export default function RosterManagementPage(props: RosterManagementPageProps) {
    const classes = rosterManagementPageStyles({});
    const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null);
    const [teamName, setTeamName] = React.useState<string | null>(null);
    const [season, setSeason] = React.useState<string | null>(null);
    const [checked, setChecked] = React.useState(new Set<string>());
    const [newAthletes, setNewAthletes] = React.useState<Athlete[]>([]);

    const handleTeamSelected = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        let team = props.teams.filter(team => team.id === event.target.value);
        setSelectedTeam(team.length > 0 ? team[0] : null);
        setTeamName(null);
    };

    const handleToggle = (value: string) => () => {
        const newChecked = new Set(checked);

        if (checked.has(value)) {
            newChecked.delete(value);
        } else {
            newChecked.add(value);
        }

        setChecked(newChecked);
    };

    const handleAddTeam = () => {
        setSelectedTeam(null);
        setTeamName(null);
    };

    const handleTeamNameChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        setTeamName(event.target.value);
    };

    const handleSeasonChange = (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        setSeason(event.target.value);
    };

    const handleAthleteDelete = () => {};

    const handleAddAthletes = () => {};

    const handleSave = () => {};

    return (
        <div className={classes.root}>
            <Paper className={classes.introPaper}>
                <Typography className={classes.introText}>
                    Edit one of your current teams:
                </Typography>
                <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel id="team-select-label">Team</InputLabel>
                    <Select
                        labelWidth={40}
                        id="team-select"
                        value={!!selectedTeam ? selectedTeam.id : ""}
                        onChange={handleTeamSelected}
                    >
                        <MenuItem value="" disabled>
                            Select the team to edit...
                        </MenuItem>
                        {props.teams.map((team: Team, i: number) => (
                            <MenuItem key={i} value={team.id}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography className={classes.introText}>
                    or add a new one:
                </Typography>
                <IconButton
                    aria-label="add"
                    className={classes.introButton}
                    onClick={handleAddTeam}
                >
                    <AddIcon />
                </IconButton>
            </Paper>
            <Paper className={classes.paperContent}>
                <div>
                    <TextField
                        id="team-name"
                        className={classes.textInput}
                        label="Team Name"
                        placeholder="(e.g. Women's Soccer)"
                        margin="normal"
                        variant="outlined"
                        value={
                            !!selectedTeam
                                ? teamName != null
                                    ? teamName
                                    : selectedTeam.name
                                : ""
                        }
                        onChange={handleTeamNameChange}
                    />
                    <TextField
                        id="season"
                        className={classes.textInput}
                        label="Season"
                        placeholder="(e.g. 2019/2020)"
                        margin="normal"
                        variant="outlined"
                        value={
                            !!selectedTeam
                                ? season != null
                                    ? season
                                    : selectedTeam.season
                                : ""
                        }
                        onChange={handleSeasonChange}
                    />
                </div>
                <Divider className={classes.contentDivider} />
                <div className={classes.athleteContentContainer}>
                    <Paper className={classes.card}>
                        <div className={classes.athletesContainer}>
                            <List dense className={classes.athletesList}>
                                {!!selectedTeam ? (
                                    selectedTeam.athletes.map(
                                        (athlete: Athlete) => {
                                            const labelId = `checkbox-list-secondary-label-${athlete.name}`;
                                            return (
                                                <ListItem
                                                    key={athlete.id}
                                                    button
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt={`Avatar n°${athlete.id}`}
                                                        >
                                                            {athlete.name.slice(
                                                                0,
                                                                1
                                                            )}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        id={labelId}
                                                        primary={athlete.name}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox
                                                            edge="end"
                                                            onChange={handleToggle(
                                                                athlete.id
                                                            )}
                                                            checked={checked.has(
                                                                athlete.id
                                                            )}
                                                            inputProps={{
                                                                "aria-labelledby": labelId
                                                            }}
                                                        />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            );
                                        }
                                    )
                                ) : (
                                    <></>
                                )}
                            </List>
                            <Divider light />
                            <Button
                                variant="contained"
                                className={classes.existingAthletesButton}
                                onClick={handleAthleteDelete}
                            >
                                Delete
                                {checked.size > 0
                                    ? " (" + checked.size + " selected)"
                                    : ""}
                                <DeleteIcon />
                            </Button>
                        </div>
                    </Paper>
                    <Paper className={classes.card}>
                        <div className={classes.athletesContainer}>
                            <div className={classes.uploadPrompt}>
                                <div className={classes.fileDownload}>
                                    <Typography>
                                        Please upload the filled spreadsheet
                                        found{" "}
                                        <a href="" download>
                                            here
                                        </a>{" "}
                                        and then add the athletes.
                                    </Typography>
                                </div>
                                <Divider light />
                                <div className={classes.dropzone}>
                                    <MyDropzone></MyDropzone>
                                </div>
                                <Divider light />
                                <div className={classes.addedAthletes}>
                                    Athletes
                                </div>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    disabled={newAthletes.length == 0}
                                    className={classes.newAthletesButton}
                                    onClick={handleAddAthletes}
                                >
                                    Add Athletes
                                    <AddIcon />
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.saveButton}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Paper>
        </div>
    );
}

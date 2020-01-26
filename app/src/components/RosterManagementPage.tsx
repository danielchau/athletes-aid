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
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Athlete, Team, NavigationPanelStates, AthleteProfile, ListAthlete } from "../util/types";
import MyDropzone from "./Dropzone";
import AddAthleteTable from "./AddAthleteTable";
import clsx from "clsx";
import {
    createTeam,
    getAthleteTemplate,
    updateTeamInfo,
    updateTeamAthletes
} from "../actions/TeamAction";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AthleteList from "./AthleteList";
import { getAllAthletes } from "../actions/AthleteAction";

interface RosterManagementPageProps {
    state: NavigationPanelStates;
    teams: Team[];
    getTeams: (id: string) => void;
}

export default function RosterManagementPage(props: RosterManagementPageProps) {
    const classes = rosterManagementPageStyles({});
    const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null);
    const [teamName, setTeamName] = React.useState<string | null>("");
    const [season, setSeason] = React.useState<string | null>("");
    const [existingAthletesChecked, setExistingAthletesChecked] = React.useState(new Set<string>());
    const [newAthletesChecked, setNewAthletesChecked] = React.useState(new Set<string>());
    const [newAthletes, setNewAthletes] = React.useState<AthleteProfile[]>([]);
    const [tab, setTab] = React.useState<number>(0);
    const handleTabChange = (_: React.ChangeEvent, newValue: any) => {
        setTab(newValue);
    };
    const [allAthletes, setAllAthletes] = React.useState<ListAthlete[]>([]);

    React.useEffect(() => {
        getAllAthletes("").then((response: ListAthlete[] | null) => {
            if (!!response) {
                setAllAthletes(response);
            }
        });
    }, []);

    const handleTeamSelected = (event: React.ChangeEvent<{ value: string }>) => {
        let team = props.teams.filter(team => team.id === event.target.value);
        setSelectedTeam(team.length > 0 ? team[0] : null);
        setTeamName(null);
        setSeason(null);
    };

    const handleExistingAthletesToggle = (value: string) => {
        const newChecked = new Set(existingAthletesChecked);

        if (existingAthletesChecked.has(value)) {
            newChecked.delete(value);
        } else {
            newChecked.add(value);
        }

        setExistingAthletesChecked(newChecked);
    };

    const handleNewAthletesToggle = (value: string) => {
        const newChecked = new Set(newAthletesChecked);

        if (newAthletesChecked.has(value)) {
            newChecked.delete(value);
        } else {
            newChecked.add(value);
        }

        setNewAthletesChecked(newChecked);
    };

    const handleAddTeam = () => {
        setSelectedTeam(null);
        setTeamName("");
        setSeason("");
    };

    const handleTeamNameChange = (event: React.ChangeEvent<{ value: string }>) => {
        setTeamName(event.target.value);
    };

    const handleSeasonChange = (event: React.ChangeEvent<{ value: string }>) => {
        setSeason(event.target.value);
    };

    const handleAthleteDelete = () => {
        let athleteIds = selectedTeam.athletes
            .filter(a => !existingAthletesChecked.has(a.id))
            .map(a => a.id);
        updateTeamAthletes(selectedTeam.id, athleteIds);
        props.getTeams("");
    };

    const handleAddAthletes = () => {
        let athleteIds = [];
        let allAthleteMap = new Map<string, string>();
        allAthletes.forEach(a => allAthleteMap.set(a.name + a.birthdate, a.id));
        let rosterAthleteSet = new Set<string>();
        selectedTeam.athletes.forEach(a => rosterAthleteSet.add(a.id));

        if (tab == 0) {
            athleteIds = newAthletes
                .map(nA => {
                    return allAthleteMap.get(nA.name + nA.birthdate);
                })
                .filter(a => !rosterAthleteSet.has(a));
        } else {
            athleteIds = Array.from(newAthletesChecked);
        }

        athleteIds = Array.from(rosterAthleteSet).concat(athleteIds);
        updateTeamAthletes(selectedTeam.id, athleteIds);
        props.getTeams("");
    };

    const handleSave = () => {
        if (!!selectedTeam) {
            updateTeamInfo(selectedTeam.id, teamName, season);
            props.getTeams("");
        } else {
            createTeam(teamName, season);
        }
    };

    const transformExistingAthletesToList = (athletes: Athlete[]) => {
        return athletes.map(a => {
            return {
                id: a.id,
                name: a.name,
                birthdate: null
            };
        });
    };

    const determineAddButtonState = (): boolean => {
        let allAthleteSet = new Set<string>();
        allAthletes.forEach(a => allAthleteSet.add(a.name + a.birthdate));

        let athletesInDatabase = newAthletes.filter(nA =>
            allAthleteSet.has(nA.name + nA.birthdate)
        );

        return athletesInDatabase.length != newAthletes.length;
    };

    const filterNewAthletes = () => {
        let rosterAthletes = new Set();
        selectedTeam.athletes.forEach(a => rosterAthletes.add(a.id));
        return allAthletes.filter(a => !rosterAthletes.has(a.id));
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.drawerOpen]: props.state === NavigationPanelStates.open,
                [classes.drawerClosed]: !(props.state === NavigationPanelStates.open)
            })}
        >
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
                                {team.name + " -  " + team.season}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography className={classes.introText}>or add a new one:</Typography>
                <IconButton
                    aria-label="add"
                    className={classes.introButton}
                    onClick={handleAddTeam}
                >
                    <AddIcon />
                </IconButton>
            </Paper>
            <Paper className={classes.paperContent}>
                <div className={classes.teamInfoContainer}>
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
                                : teamName
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
                                : season
                        }
                        onChange={handleSeasonChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.saveButton}
                        onClick={handleSave}
                    >
                        {!!selectedTeam ? "Save" : "Create"}
                    </Button>
                </div>
                <Divider className={classes.contentDivider} />
                <div className={classes.athleteContentContainer}>
                    {!!!selectedTeam ? (
                        <div className={classes.createPromptContainer}>
                            <Typography className={classes.createPrompt}>
                                Please create a team or select an existing one before
                                adding/modifying athletes.
                            </Typography>
                        </div>
                    ) : (
                        <>
                            <Paper className={classes.card}>
                                <div className={classes.athletesContainer}>
                                    <AthleteList
                                        athletes={
                                            !!selectedTeam
                                                ? transformExistingAthletesToList(
                                                      selectedTeam.athletes
                                                  )
                                                : []
                                        }
                                        handleToggle={handleExistingAthletesToggle}
                                        checked={existingAthletesChecked}
                                    />
                                    <Divider light />
                                    <Button
                                        variant="contained"
                                        className={classes.existingAthletesButton}
                                        onClick={handleAthleteDelete}
                                        color="primary"
                                        disabled={existingAthletesChecked.size == 0}
                                    >
                                        Delete
                                        {existingAthletesChecked.size > 0
                                            ? " (" + existingAthletesChecked.size + " selected)"
                                            : ""}
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            </Paper>
                            <Paper className={classes.card}>
                                <div className={classes.athletesContainer}>
                                    <Tabs
                                        className={classes.tabRoot}
                                        value={tab}
                                        onChange={handleTabChange}
                                        indicatorColor="secondary"
                                        centered
                                        variant="fullWidth"
                                    >
                                        <Tab label="Bulk Addition" />
                                        <Tab label="Individual Addition" />
                                    </Tabs>
                                    {tab == 0 ? (
                                        <div className={classes.uploadPrompt}>
                                            <div className={classes.fileDownload}>
                                                <Typography>
                                                    Please upload a filled spreadsheet found{" "}
                                                    <a
                                                        className={classes.downloadLink}
                                                        onClick={getAthleteTemplate}
                                                    >
                                                        here
                                                    </a>{" "}
                                                    below.
                                                </Typography>
                                            </div>
                                            <Divider light />
                                            <div className={classes.dropzone}>
                                                <MyDropzone
                                                    setNewAthletes={setNewAthletes}
                                                ></MyDropzone>
                                            </div>
                                            <Divider light />
                                            <div className={classes.addedAthletes}>
                                                <AddAthleteTable
                                                    athletes={newAthletes}
                                                    rosterAthletes={selectedTeam.athletes}
                                                    allAthletes={allAthletes}
                                                    setAllAthletes={setAllAthletes}
                                                    getTeams={props.getTeams}
                                                ></AddAthleteTable>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={classes.newAthleteContainer}>
                                            <AthleteList
                                                athletes={filterNewAthletes()}
                                                handleToggle={handleNewAthletesToggle}
                                                checked={newAthletesChecked}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <Button
                                            variant="contained"
                                            disabled={determineAddButtonState()}
                                            className={classes.newAthletesButton}
                                            onClick={handleAddAthletes}
                                            color="primary"
                                        >
                                            Add Athletes
                                            <AddIcon />
                                        </Button>
                                    </div>
                                </div>
                            </Paper>
                        </>
                    )}
                </div>
            </Paper>
        </div>
    );
}

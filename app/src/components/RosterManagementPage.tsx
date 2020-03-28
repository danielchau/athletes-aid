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
import {
    Athlete,
    Team,
    NavigationPanelStates,
    AthleteProfile,
    ListAthlete,
    User
} from "../util/types";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import FetchingScreen from "./FetchingScreen";
import { fetchCurrentRosterEndpoint } from "../actions/TeamAction";
import { Grid, Tooltip } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { rosterManagementPageName } from "../constants/constants";
import HelpDialog from "./HelpDialog";
import ErrorDialog from "./ErrorDialog";
import { UserPermissions } from "../util/permissions";

interface RosterManagementPageProps {
    state: NavigationPanelStates;
    selectedTeam: Team;
    teams: Team[];
    getTeams: (permissions: UserPermissions) => Promise<Team[]>;
    currentUser: User;
    setSelectedTeam: any;
}

/**
 * Roster Management Page displays information on how to add teams and edit them.
 * @param props
 */
export default function RosterManagementPage(props: RosterManagementPageProps) {
    const classes = rosterManagementPageStyles({});
    const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null);
    const [currentRoster, setCurrentRoster] = React.useState<Athlete[]>(null);
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
    const [isFetching, setIsFetching] = React.useState<string>("");
    const [isRosterFetching, setIsRosterFetching] = React.useState<boolean>(false);
    const [isCreatingNewTeam, setIsCreatingNewTeam] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

    /**
     * Get all athletes in the database so that admin knows who they can add individually.
     */
    React.useEffect(() => {
        getAllAthletes("").then((response: ListAthlete[] | null) => {
            if (!!response) {
                setAllAthletes(response);
            } else {
                setOpenError(true);
            }
        });
    }, []);

    React.useEffect(() => {
        if (isCreatingNewTeam) {
            setCurrentRoster([]);
            setSelectedTeam(
                props.teams.filter((t: Team) => {
                    return t.name == teamName && t.season == season;
                })[0]
            );
            setIsCreatingNewTeam(false);
        }
    }, [props.teams]);

    /**
     * If the teams change, update the relevant states.
     */
    React.useEffect(() => {
        if (!!selectedTeam) {
            let newSelectedTeam = props.teams.filter(t => t.id == selectedTeam.id);
            if (newSelectedTeam.length > 0) {
                if (newSelectedTeam[0].id == props.selectedTeam.id) {
                    props.setSelectedTeam(newSelectedTeam[0]);
                }
                setSelectedTeam(newSelectedTeam[0]);
                setIsRosterFetching(true);
                fetchCurrentRosterEndpoint(newSelectedTeam[0].athleteIds).then(
                    (athletes: Athlete[]) => {
                        setCurrentRoster(
                            athletes.sort((a, b) => {
                                if (a.name < b.name) {
                                    return -1;
                                } else if (a.name > b.name) {
                                    return 1;
                                }
                                return 0;
                            })
                        );
                        setIsRosterFetching(false);
                    }
                );
            }
        }
    }, [props.teams]);

    React.useEffect(() => {
        setIsFetching("");
    }, [currentRoster]);

    /**
     * Set the state depending on what team has been selected or if a new team is being created.
     * @param event
     */
    const handleTeamSelected = (event: React.ChangeEvent<{ value: string }>) => {
        let team = props.teams.filter(team => team.id === event.target.value);
        setSelectedTeam(team.length > 0 ? team[0] : null);
        if (team.length > 0) {
            setIsRosterFetching(true);
            fetchCurrentRosterEndpoint(team[0].athleteIds).then((athletes: Athlete[]) => {
                setCurrentRoster(
                    athletes.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                        } else if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    })
                );
                setIsRosterFetching(false);
            });
        } else {
            setCurrentRoster(null);
        }
        setTeamName(null);
        setSeason(null);
    };

    /**
     * Left side roster: toggle the checkbox of the athlete.
     * @param value
     */
    const handleExistingAthletesToggle = (value: string) => {
        const newChecked = new Set(existingAthletesChecked);

        if (existingAthletesChecked.has(value)) {
            newChecked.delete(value);
        } else {
            newChecked.add(value);
        }

        setExistingAthletesChecked(newChecked);
    };

    /**
     * Right side athletes: toggle the checkbox of the athlete.
     * @param value
     */
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
        setCurrentRoster(null);
        setTeamName("");
        setSeason("");
    };

    const handleTeamNameChange = (event: React.ChangeEvent<{ value: string }>) => {
        setTeamName(event.target.value);
    };

    const handleSeasonChange = (event: React.ChangeEvent<{ value: string }>) => {
        setSeason(event.target.value);
    };

    /**
     * Send a server request to delete selected athletes off the team.
     */
    const handleAthleteDelete = () => {
        let athleteIds = currentRoster
            .filter(a => !existingAthletesChecked.has(a.id))
            .map(a => a.id);
        setIsFetching("delete");
        setExistingAthletesChecked(new Set());
        updateTeamAthletes(selectedTeam.id, athleteIds).then((response: any) => {
            if (!!response) {
                props.getTeams(props.currentUser.permissions);
            } else {
                setOpenError(true);
            }
        });
    };

    /**
     * SEnd a server request to add selected athletes to a team.
     */
    const handleAddAthletes = () => {
        let athleteIds = [];
        let allAthleteMap = new Map<string, string>();
        allAthletes.forEach(a => allAthleteMap.set(a.name + a.birthdate, a.id));
        let rosterAthleteSet = new Set<string>();
        currentRoster.forEach(a => rosterAthleteSet.add(a.id));

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
        setIsFetching("add");
        setNewAthletesChecked(new Set());
        updateTeamAthletes(selectedTeam.id, athleteIds).then((response: any) => {
            if (!!response) {
                props.getTeams(props.currentUser.permissions);
            } else {
                setOpenError(true);
            }
        });
    };

    /**
     * Send a server request to save edited information about an existing team or create a new team.
     */
    const handleSave = () => {
        setIsFetching("teamUpdate");
        if (!!selectedTeam) {
            updateTeamInfo(selectedTeam.id, teamName, season).then((response: any) => {
                if (!!response) {
                    props.getTeams(props.currentUser.permissions);
                } else {
                    setOpenError(true);
                }
                setIsFetching("");
            });
        } else {
            createTeam(teamName, season).then((response: any) => {
                if (!!response) {
                    props.getTeams(props.currentUser.permissions);
                    setIsCreatingNewTeam(true);
                } else {
                    setOpenError(true);
                }
                setIsFetching("");
            });
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
        let athleteState = false;
        if (tab == 0) {
            let allAthleteSet = new Set<string>();
            allAthletes.forEach(a => allAthleteSet.add(a.name + a.birthdate));

            let athletesInDatabase = newAthletes.filter(nA =>
                allAthleteSet.has(nA.name + nA.birthdate)
            );

            athleteState = athletesInDatabase.length != newAthletes.length;
        } else {
            athleteState = newAthletesChecked.size <= 0;
        }
        return athleteState || isFetching == "add";
    };

    const filterNewAthletes = () => {
        let rosterAthletes = new Set();
        currentRoster.forEach(a => rosterAthletes.add(a.id));
        return allAthletes.filter(a => !rosterAthletes.has(a.id));
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.drawerOpen]: props.state === NavigationPanelStates.open,
                [classes.drawerClosed]: !(props.state === NavigationPanelStates.open)
            })}
        >
            <ErrorDialog open={openError} setOpen={setOpenError} />
            <Tooltip title="Help">
                <IconButton
                    style={{ position: "absolute", top: "68px", right: "4px" }}
                    onClick={() => setOpen(true)}
                >
                    <HelpIcon />
                </IconButton>
            </Tooltip>
            <HelpDialog open={open} setOpen={setOpen} page={rosterManagementPageName} />
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
                <Tooltip title="Create new team">
                    <IconButton
                        aria-label="add"
                        className={classes.introButton}
                        onClick={handleAddTeam}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
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
                        disabled={isFetching == "teamUpdate"}
                    >
                        {isFetching == "teamUpdate" ? (
                            <CircularProgress size={24} color={"inherit"} />
                        ) : !!selectedTeam ? (
                            "Save"
                        ) : (
                            "Create"
                        )}
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
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
                                <Paper className={classes.card}>
                                    <div className={classes.athletesContainer}>
                                        {isRosterFetching ? (
                                            <div className={classes.athletesList}>
                                                <FetchingScreen />
                                            </div>
                                        ) : (
                                            <AthleteList
                                                athletes={
                                                    !!selectedTeam
                                                        ? transformExistingAthletesToList(
                                                              currentRoster
                                                          )
                                                        : []
                                                }
                                                handleToggle={handleExistingAthletesToggle}
                                                checked={existingAthletesChecked}
                                            />
                                        )}
                                        <Divider light />
                                        <Button
                                            variant="contained"
                                            className={classes.existingAthletesButton}
                                            onClick={handleAthleteDelete}
                                            color="primary"
                                            disabled={
                                                existingAthletesChecked.size == 0 ||
                                                isFetching == "delete"
                                            }
                                        >
                                            {isFetching == "delete" ? (
                                                <CircularProgress size={24} color={"secondary"} />
                                            ) : (
                                                <>
                                                    Delete
                                                    {existingAthletesChecked.size > 0
                                                        ? " (" +
                                                          existingAthletesChecked.size +
                                                          " selected)"
                                                        : ""}
                                                    <DeleteIcon />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
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
                                                        rosterAthletes={currentRoster}
                                                        allAthletes={allAthletes}
                                                        setAllAthletes={setAllAthletes}
                                                        getTeams={props.getTeams}
                                                        currentUser={props.currentUser}
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
                                                {isFetching == "add" ? (
                                                    <CircularProgress
                                                        size={24}
                                                        color={"secondary"}
                                                    />
                                                ) : (
                                                    <>
                                                        Add Athletes
                                                        <AddIcon />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </Paper>
        </div>
    );
}

import React from "react";
import {
    User,
    NavigationPanelStates,
    AthleteInjuries,
    Team,
    AthleteProfile,
    Athlete
} from "../util/types";
import { profilePageStyles } from "../styles/react/ProfilePageStyles";
import {
    Avatar,
    Typography,
    Divider,
    Paper,
    IconButton,
    Grid,
    CircularProgress,
    Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import InjuriesDataTable from "./InjuriesDataTable";
import clsx from "clsx";
import ProfilePageInfo from "./ProfilePageInfo";
import FetchingScreen from "./FetchingScreen";
import BodyVisualization from "./BodyVisualization";
import AddIcon from "@material-ui/icons/Add";
import DescriptionIcon from "@material-ui/icons/Description";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import { addFileToAthlete, fetchAthleteFile, deleteAthleteFile } from "../actions/AthleteAction";
import HelpIcon from "@material-ui/icons/Help";
import { profilePageName } from "../constants/constants";
import HelpDialog from "./HelpDialog";
import ErrorDialog from "./ErrorDialog";

interface ProfilePageProps {
    state: NavigationPanelStates;
    currentAthlete: AthleteProfile;
    currentUser: User;
    canEdit: boolean;
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) => AthleteInjuries;
    startingDate: Date;
    endingDate: Date;
    selectedTeam: Team;
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}

/**
 * Profile page displays an athlete profile which includes:
 * Basic information, files and forms, and a data table of the injuries related to the athlete.
 * @param props
 */
export default function ProfilePage(props: ProfilePageProps) {
    const classes = profilePageStyles({});
    const [injuryOpen, setInjuryOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false);
    const [files, setFiles] = React.useState<string[]>(props.currentAthlete.files);
    const [isLoadingFiles, setIsLoadingFiles] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

    const handleInjuryOpen = () => {
        setInjuryOpen(true);
    };

    const handleInjuryClose = () => {
        setInjuryOpen(false);
    };

    const onEditClick = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setIsUpdating(true);
        }
    };

    const onFileInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        if (event.target.files && event.target.files[0]) {
            let file = new FormData();
            setIsLoadingFiles(true);
            file.append("fileUpload", event.target.files[0]);
            file.append("userId", props.currentAthlete.id);
            addFileToAthlete(file).then((f: string | null) => {
                if (!!f) {
                    let tempFiles = files.slice();
                    tempFiles.push(f.split("/")[1]);
                    setFiles(tempFiles);
                    setIsLoadingFiles(false);
                } else {
                    setOpenError(true);
                }
            });
        }
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
            <HelpDialog open={open} setOpen={setOpen} page={profilePageName} />
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={4} className={classes.gridItem}>
                    <div className={classes.leftCol}>
                        {isUpdating && <FetchingScreen />}
                        <div style={{ visibility: isUpdating ? "hidden" : "visible" }}>
                            {props.canEdit && (
                                <Tooltip title={isEditing ? "Save" : "Edit"}>
                                    <IconButton
                                        style={{
                                            color: isEditing ? "#0055B7" : "#F2A71E",
                                            position: "absolute"
                                        }}
                                        onClick={onEditClick}
                                    >
                                        {isEditing ? <CheckIcon /> : <EditIcon />}
                                    </IconButton>
                                </Tooltip>
                            )}
                            {props.currentAthlete.profilePicture == "" ? (
                                <Avatar className={classes.profilePicture}>
                                    {props.currentAthlete.name.substr(0, 1)}
                                </Avatar>
                            ) : (
                                <Avatar
                                    className={classes.profilePicture}
                                    src={props.currentAthlete.profilePicture}
                                ></Avatar>
                            )}
                            <Typography className={classes.name} variant="h4">
                                {props.currentAthlete.name}
                            </Typography>
                            <Divider light />
                            <ProfilePageInfo
                                currentAthlete={props.currentAthlete}
                                isEditing={isEditing}
                                setIsUpdating={setIsUpdating}
                                currentUser={props.currentUser}
                            />
                            <Divider light />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={8} className={classes.gridItem}>
                    <div className={classes.rightCol}>
                        <Typography className={classes.heading} variant="h5">
                            Files / Forms
                        </Typography>
                        <Paper className={classes.fileContent}>
                            {files.map(f => (
                                <File
                                    userId={props.currentAthlete.id}
                                    file={f}
                                    files={files}
                                    setFiles={setFiles}
                                    canEdit={props.currentUser.permissions.canEditOtherProfiles}
                                    setOpenError={setOpenError}
                                />
                            ))}
                            {props.currentUser.permissions.canEditOtherProfiles && (
                                <form
                                    encType="multipart/form-data"
                                    onChange={onFileInputChange}
                                    style={{ margin: "16px" }}
                                >
                                    <input
                                        id="icon-button-file"
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <Tooltip title="Upload file">
                                            <IconButton
                                                color="primary"
                                                component="span"
                                                disabled={isLoadingFiles}
                                            >
                                                {isLoadingFiles ? (
                                                    <CircularProgress />
                                                ) : (
                                                    <AddIcon fontSize="large" />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                    </label>
                                </form>
                            )}
                        </Paper>
                        <Divider light />
                        <Typography className={classes.heading} variant="h5">
                            Injuries
                        </Typography>
                        <div className={classes.injuryDataTableContainer}>
                            <InjuriesDataTable
                                injuries={props.currentAthlete.injuries}
                                injuryOpen={injuryOpen}
                                handleInjuryOpen={handleInjuryOpen}
                                handleInjuryClose={handleInjuryClose}
                                getAthleteInjuries={props.getAthleteInjuries}
                                startingDate={props.startingDate}
                                endingDate={props.endingDate}
                                selectedTeam={props.selectedTeam}
                                currentUser={props.currentUser}
                                getCurrentRoster={props.getCurrentRoster}
                            ></InjuriesDataTable>
                        </div>
                        <Divider light />
                        <Paper className={classes.vizPaper}>
                            <BodyVisualization injuries={props.currentAthlete.injuries} />
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

interface FileProps {
    userId: string;
    file: string;
    files: string[];
    setFiles: any;
    canEdit: boolean;
    setOpenError: any;
}

function File(props: FileProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                padding: "16px",
                height: "100%",
                position: "relative",
                border: "1px solid #fff",
                borderRadius: "5px",
                marginRight: "8px"
            }}
        >
            <IconButton
                color="secondary"
                component="span"
                style={{ position: "absolute", top: "5px", left: "5px" }}
                onClick={() => fetchAthleteFile(props.userId, props.file)}
            >
                <GetAppIcon fontSize="small" />
            </IconButton>
            {props.canEdit && (
                <IconButton
                    component="span"
                    style={{ position: "absolute", top: "5px", right: "5px", color: "#d13f3f" }}
                    onClick={() => {
                        deleteAthleteFile(props.userId, props.file).then((s: string | null) => {
                            if (typeof s == "string") {
                                let tempFiles = props.files.slice();
                                tempFiles.splice(props.files.indexOf(props.file), 1);
                                props.setFiles(tempFiles);
                            } else {
                                props.setOpenError(true);
                            }
                        });
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )}
            <DescriptionIcon style={{ flexGrow: 1, width: "auto", color: "#808080" }} />
            <Typography
                style={{ textAlign: "center", maxWidth: "150px", overflow: "hidden" }}
                variant="body2"
            >
                {props.file}
            </Typography>
        </div>
    );
}

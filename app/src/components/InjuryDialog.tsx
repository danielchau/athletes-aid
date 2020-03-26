import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import UpdateIcon from "@material-ui/icons/Update";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import InjuryLoggingPageContainer from "../containers/InjuryLoggingPageContainer";
import { TransitionProps } from "@material-ui/core/transitions";
import { injuryDialogStyles } from "../styles/react/InjuryDialogStyles";
import { Injury, InjuryNote, AthleteInjuries, Team, User, Athlete } from "../util/types";
import SendIcon from "@material-ui/icons/Send";
import { TextField, Switch, Tabs, Tab } from "@material-ui/core";
import { postInjuryNote, setInjuryStatus } from "../actions/InjuriesAction";
import ErrorDialog from "./ErrorDialog";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

interface InjuryDialogProps {
    injury: Injury;
    injuryOpen: boolean;
    handleInjuryClose: any;
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) => AthleteInjuries;
    startingDate: Date;
    endingDate: Date;
    selectedTeam: Team;
    currentUser: User;
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}

/**
 * Injury Dialog displays information on a certain injury.
 * Features: Editing, adding notes, setting active state.
 * @param props
 */
export default function InjuryDialog(props: InjuryDialogProps) {
    const classes = injuryDialogStyles({});
    const [isEditing, setIsEditing] = React.useState(false);
    const [newNote, setNewNote] = React.useState<string>("");
    const [injury, setInjury] = React.useState<Injury>(props.injury);
    const [tab, setTab] = React.useState<number>(0);
    const handleTabChange = (_: React.ChangeEvent, newValue: any) => {
        setTab(newValue);
    };
    const [openError, setOpenError] = React.useState(false);

    React.useEffect(() => {
        setInjury(props.injury);
    }, [props.injury]);

    const handleIsEditing = (injury: Injury) => {
        setIsEditing(!isEditing);
        if (isEditing && !!injury) {
            props.getAthleteInjuries(props.startingDate, props.endingDate, props.selectedTeam.id);
            setInjury(injury);
        }
    };

    const handleNewNoteChange = (event: React.ChangeEvent<{ value: string }>) => {
        setNewNote(event.target.value);
    };

    const onSendClick = () => {
        if (newNote != "") {
            postInjuryNote(
                props.injury.id,
                newNote,
                props.currentUser.firstName + " " + props.currentUser.lastName,
                tab == 1
            ).then((injury: Injury | null) => {
                if (!!injury) {
                    props.getAthleteInjuries(
                        props.startingDate,
                        props.endingDate,
                        props.selectedTeam.id
                    );
                    setInjury(injury);
                } else {
                    setOpenError(true);
                }
                setNewNote("");
            });
        }
    };

    const onActiveSwitch = () => {
        setInjuryStatus(props.injury.id, !injury.active).then((injury: Injury | null) => {
            if (!!injury) {
                props.getAthleteInjuries(
                    props.startingDate,
                    props.endingDate,
                    props.selectedTeam.id
                );
                setInjury(injury);
                props.getCurrentRoster(props.selectedTeam.athleteIds);
            } else {
                setOpenError(true);
            }
        });
    };

    return (
        <div>
            <ErrorDialog open={openError} setOpen={setOpenError} />
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                BackdropProps={{
                    style: {
                        backgroundColor: "transparent"
                    }
                }}
                fullWidth
                open={props.injuryOpen}
                onClose={() => {
                    setIsEditing(false);
                    props.handleInjuryClose();
                }}
                TransitionComponent={Transition}
            >
                <DialogTitle className={classes.dialogTitle}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={props.handleInjuryClose}
                                aria-label="close"
                            >
                                <ChevronRightIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {injury.athleteName}
                            </Typography>
                            <IconButton color="inherit" onClick={() => handleIsEditing(null)}>
                                {isEditing ? <CancelIcon /> : <EditIcon />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </DialogTitle>
                <DialogContent className={classes.dialogContentContainer}>
                    {isEditing ? (
                        <InjuryLoggingPageContainer
                            existingInjury={injury}
                            callbackUponFinishing={handleIsEditing}
                        ></InjuryLoggingPageContainer>
                    ) : (
                        <div className={classes.dialogContent}>
                            <div className={classes.activeSwitchContainer}>
                                <p style={{ fontWeight: 300 }}>Not Active</p>
                                <div style={{ marginTop: "5px" }}>
                                    <Switch checked={injury.active} onChange={onActiveSwitch} />
                                </div>
                                <p style={{ fontWeight: 300 }}>Active</p>
                            </div>
                            {injury.injuryDescription != "" && (
                                <Paper className={classes.dialogContentPaper}>
                                    {injury.injuryDescription}
                                </Paper>
                            )}
                            <Paper className={classes.dialogContentPaper}>
                                <p>
                                    <b>Team Name: </b>
                                    {injury.teamName}
                                </p>
                                <Divider light></Divider>
                                {[
                                    ["Injury Date: ", injury.injuryDate.toDateString()],
                                    ["Is Sport Related: ", injury.isSportsRelated ? "Yes" : "No"],
                                    ["Event Type: ", injury.eventType],
                                    ["Side Of Body: ", injury.sideOfBody],
                                    ["Location On Body: ", injury.locationOnBody],
                                    ["Injury Type: ", injury.injuryType],
                                    ["Severity: ", injury.severity],
                                    ["Status: ", injury.status],
                                    ["Mechanism of Injury: ", injury.mechanism]
                                ].map(([title, val]) => (
                                    <p>
                                        <b>{title}</b>
                                        {val}
                                    </p>
                                ))}
                            </Paper>

                            <Paper className={classes.dialogContentPaper}>
                                <Tabs
                                    className={classes.tabRoot}
                                    value={tab}
                                    onChange={handleTabChange}
                                    indicatorColor="secondary"
                                    centered
                                    variant="fullWidth"
                                >
                                    <Tab label="Notes" />
                                    <Tab label="Specialist Notes" />
                                </Tabs>
                                <div className={classes.newNoteContainer}>
                                    <TextField
                                        id="other-notes"
                                        className={classes.newNote}
                                        label="Enter new note..."
                                        multiline
                                        rows="3"
                                        margin="normal"
                                        variant="outlined"
                                        value={newNote}
                                        onChange={handleNewNoteChange}
                                    />
                                    <IconButton
                                        className={classes.sendButton}
                                        onClick={onSendClick}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </div>
                                <div className={classes.notesContainer}>
                                    {(tab == 0 ? injury.otherNotes : injury.specialNotes)
                                        .sort(
                                            (a, b) => b.createdOn.getTime() - a.createdOn.getTime()
                                        )
                                        .map((note: InjuryNote, i: number) => (
                                            <Paper
                                                key={i}
                                                className={classes.notePaper}
                                                style={{
                                                    backgroundColor:
                                                        note.createdBy != "Update"
                                                            ? "#ffffff"
                                                            : "#dae2eb"
                                                }}
                                            >
                                                <div className={classes.noteContainer}>
                                                    {note.createdBy != "Update" ? (
                                                        <ChatBubbleOutlineIcon
                                                            className={classes.noteIcon}
                                                        />
                                                    ) : (
                                                        <UpdateIcon className={classes.noteIcon} />
                                                    )}
                                                    <div style={{ whiteSpace: "pre-line" }}>
                                                        <b>
                                                            {note.createdOn
                                                                .toISOString()
                                                                .slice(0, 19)
                                                                .replace(/-/g, "/")
                                                                .replace("T", " ")}{" "}
                                                            | {note.createdBy}
                                                        </b>
                                                        <Divider light />
                                                        {note.content}
                                                    </div>
                                                </div>
                                            </Paper>
                                        ))}
                                </div>
                            </Paper>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

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
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import InjuryLoggingPageContainer from "../containers/InjuryLoggingPageContainer";
import { TransitionProps } from "@material-ui/core/transitions";
import { injuryDialogStyles } from "../styles/react/InjuryDialogStyles";
import { Injury, InjuryNote, AthleteInjuries, Team } from "../util/types";
import SendIcon from "@material-ui/icons/Send";
import { TextField, Switch } from "@material-ui/core";
import { postInjuryNote } from "../actions/InjuriesAction";

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
}

export default function InjuryDialog(props: InjuryDialogProps) {
    const classes = injuryDialogStyles({});
    const [isEditing, setIsEditing] = React.useState(false);
    const [newNote, setNewNote] = React.useState<string>("");
    const [injury, setInjury] = React.useState<Injury>(props.injury);

    React.useEffect(() => {
        setInjury(props.injury);
    }, [props.injury]);

    const handleIsEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleNewNoteChange = (event: React.ChangeEvent<{ value: string }>) => {
        setNewNote(event.target.value);
    };

    const onSendClick = () => {
        if (newNote != "") {
            postInjuryNote(props.injury.id, newNote).then(injury => {
                props.getAthleteInjuries(
                    props.startingDate,
                    props.endingDate,
                    props.selectedTeam.name
                );
                setInjury(injury);
                setNewNote("");
            });
        }
    };

    return (
        <div>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                BackdropProps={{
                    style: {
                        backgroundColor: "transparent"
                    }
                }}
                fullWidth
                open={props.injuryOpen}
                onClose={props.handleInjuryClose}
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
                            <IconButton color="inherit" onClick={handleIsEditing}>
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
                                    <Switch checked={injury.active} onChange={() => {}} />
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
                                <p>
                                    <b>Injury Date: </b>
                                    {injury.injuryDate.toDateString()}
                                </p>
                                <p>
                                    <b>Is Sport Related: </b>
                                    {injury.isSportsRelated ? "Yes" : "No"}
                                </p>
                                <p>
                                    <b>Event Type: </b>
                                    {injury.eventType}
                                </p>
                                <p>
                                    <b>Position: </b>
                                    {injury.position}
                                </p>
                                <p>
                                    <b>Side Of Body: </b>
                                    {injury.sideOfBody}
                                </p>
                                <p>
                                    <b>Location On Body: </b>
                                    {injury.locationOnBody}
                                </p>
                                <p>
                                    <b>Injury Type: </b>
                                    {injury.injuryType}
                                </p>
                                <p>
                                    <b>Severity: </b>
                                    {injury.severity}
                                </p>
                                <Divider light></Divider>
                                <p>
                                    <b>Status: </b>
                                    {injury.status}
                                </p>
                                <p>
                                    <b>Mechanism Of Injury: </b>
                                    {injury.mechanism}
                                </p>
                            </Paper>
                            {injury.otherNotes.map((note: InjuryNote, i: number) => (
                                <Paper key={i} className={classes.notePaper}>
                                    <div className={classes.noteContainer}>
                                        <ChatBubbleOutlineIcon className={classes.noteIcon} />
                                        <div>
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
                            <div className={classes.newNoteContainer}>
                                <TextField
                                    id="other-notes"
                                    className={classes.newNote}
                                    label="Enter new note..."
                                    multiline
                                    rows="3"
                                    placeholder="Optional"
                                    margin="normal"
                                    variant="outlined"
                                    value={newNote}
                                    onChange={handleNewNoteChange}
                                />
                                <IconButton className={classes.sendButton} onClick={onSendClick}>
                                    <SendIcon />
                                </IconButton>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

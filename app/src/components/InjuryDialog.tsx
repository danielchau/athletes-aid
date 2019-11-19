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
import { Injury, InjuryNote } from "../util/types";

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="left" ref={ref} {...props} />;
    }
);

interface InjuryDialogProps {
    injury: Injury;
    injuryOpen: boolean;
    handleInjuryClose: any;
}

export default function InjuryDialog(props: InjuryDialogProps) {
    const classes = injuryDialogStyles({});
    const [isEditing, setIsEditing] = React.useState(false);

    const handleIsEditing = () => {
        setIsEditing(!isEditing);
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
                                {props.injury.athleteName}
                            </Typography>
                            <IconButton
                                color="inherit"
                                onClick={handleIsEditing}
                            >
                                {isEditing ? <CancelIcon /> : <EditIcon />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </DialogTitle>
                <DialogContent className={classes.dialogContentContainer}>
                    {isEditing ? (
                        <InjuryLoggingPageContainer
                            existingInjury={props.injury}
                            callbackUponFinishing={handleIsEditing}
                        ></InjuryLoggingPageContainer>
                    ) : (
                        <div className={classes.dialogContent}>
                            <Paper className={classes.dialogContentPaper}>
                                {props.injury.injuryDescription}
                            </Paper>
                            <Paper className={classes.dialogContentPaper}>
                                <p>
                                    <b>Team Name: </b>
                                    {props.injury.teamName}
                                </p>
                                <Divider light></Divider>
                                <p>
                                    <b>Injury Date: </b>
                                    {props.injury.injuryDate.toDateString()}
                                </p>
                                <p>
                                    <b>Is Sport Related: </b>
                                    {props.injury.isSportsRelated
                                        ? "Yes"
                                        : "No"}
                                </p>
                                <p>
                                    <b>Event Type: </b>
                                    {props.injury.eventType}
                                </p>
                                <p>
                                    <b>Position: </b>
                                    {props.injury.position}
                                </p>
                                <p>
                                    <b>Side Of Body: </b>
                                    {props.injury.sideOfBody}
                                </p>
                                <p>
                                    <b>Location On Body: </b>
                                    {props.injury.locationOnBody}
                                </p>
                                <p>
                                    <b>Injury Type: </b>
                                    {props.injury.injuryType}
                                </p>
                                <p>
                                    <b>Severity: </b>
                                    {props.injury.severity}
                                </p>
                                <Divider light></Divider>
                                <p>
                                    <b>Status: </b>
                                    {props.injury.status}
                                </p>
                                <p>
                                    <b>Mechanism Of Injury: </b>
                                    {props.injury.mechanism}
                                </p>
                            </Paper>
                            {props.injury.otherNotes.map(
                                (note: InjuryNote, i: number) => (
                                    <Paper
                                        key={i}
                                        className={classes.notePaper}
                                    >
                                        <div className={classes.noteContainer}>
                                            <ChatBubbleOutlineIcon
                                                className={classes.noteIcon}
                                            />
                                            <div>
                                                <b>
                                                    {note.createdOn.toLocaleString()}{" "}
                                                    | {note.createdBy}
                                                </b>
                                                <Divider light />
                                                {note.content}
                                            </div>
                                        </div>
                                    </Paper>
                                )
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Injury Dialog popup.
 */
export const injuryDialogStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: "relative"
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        dialogTitle: {
            padding: "0"
        },
        dialogPaper: {
            height: "100%",
            maxWidth: "600px",
            width: "50%",
            minWidth: "400px",
            position: "fixed",
            bottom: "0",
            right: "0",
            margin: "0"
        },
        dialogContentContainer: {
            padding: "0"
        },
        dialogContent: {
            padding: "16px"
        },
        dialogContentPaper: {
            backgroundColor: "#fafafa",
            padding: "8px",
            marginBottom: "8px"
        },
        notePaper: {
            padding: "8px",
            marginBottom: "8px"
        },
        noteContainer: {
            display: "flex",
            flexDirection: "row"
        },
        noteIcon: {
            margin: "auto",
            marginLeft: "8px",
            marginRight: "16px"
        },
        newNoteContainer: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
        },
        newNote: {
            flexGrow: 1,
            paddingRight: "8px"
        },
        sendButton: {
            color: "#F2A71E"
        },
        activeSwitchContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            paddingBottom: "8px"
        },
        notesContainer: {
            maxHeight: "800px",
            overflow: "auto"
        },
        tabRoot: {
            backgroundColor: "rgb(234, 234, 234)",
            borderRadius: "3px"
        }
    })
);

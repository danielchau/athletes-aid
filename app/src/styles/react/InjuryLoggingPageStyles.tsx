import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const injuryLoggingPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            padding: "16px",
            backgroundColor: "#fff"
        },
        backButton: {
            marginRight: theme.spacing(1)
        },
        completedContainer: {
            height: "calc(100% - 116px)",
            textAlign: "center",
            paddingTop: "20%"
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        paper: {
            color: theme.palette.text.secondary,
            backgroundColor: "rgba(0, 33, 69, 0.05)"
        },
        paperContent: {
            height: "100%",
            padding: "16px",
            paddingRight: "8px",
            overflow: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "start"
        },
        stepper: {
            backgroundColor: "rgba(0, 33, 69, 0.05)",
            borderRadius: "4px"
        },
        loggingContent: {
            height: "calc(100% - 168px)",
            marginBottom: "52px",
            marginTop: "8px",
            overflow: "hidden"
        },
        loggingBottomButtons: {
            position: "fixed",
            bottom: 0,
            right: 0,
            height: "52px",
            padding: "8px"
        },
        multilineInput: {
            width: "100%"
        },
        progress: {
            marginLeft: "8px",
            color: "#fff"
        }
    })
);

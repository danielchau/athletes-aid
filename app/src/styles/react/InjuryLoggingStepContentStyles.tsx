import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const injuryLoggingStepContentStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 200,
            width: "50%",
            paddingRight: "8px",
            paddingBottom: "16px"
        },
        textInput: {
            minWidth: 200,
            width: "100%",
            paddingRight: "8px",
            paddingBottom: "16px"
        },
        multilineInput: {
            width: "100%",
            paddingBottom: "16px",
            margin: "0px"
        },
        dateInput: {
            minWidth: 200,
            width: "50%",
            margin: "0px",
            paddingRight: "8px",
            paddingBottom: "16px"
        },
        checkboxInput: {
            minWidth: 200,
            width: "50%",
            margin: "0px",
            paddingRight: "8px",
            paddingBottom: "23px",
            paddingTop: "7px"
        },
        instructions: {
            textAlign: "center",
            marginBottom: theme.spacing(3),
            color: theme.palette.text.secondary,
            width: "100%"
        }
    })
);

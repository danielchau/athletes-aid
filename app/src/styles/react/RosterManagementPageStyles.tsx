import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const rosterManagementPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            padding: "8px",
            display: "flex",
            flexDirection: "column"
        },
        introPaper: {
            color: theme.palette.text.secondary,
            backgroundColor: "#fafafa",
            display: "flex",
            flexDirection: "row",
            padding: "8px",
            marginBottom: "8px"
        },
        formControl: {
            minWidth: 120,
            width: "25%"
        },
        introText: {
            margin: "auto",
            marginLeft: "8px",
            marginRight: "8px"
        },
        introButton: {
            border: "solid 1px",
            borderColor: "rgb(0,0,0,0.30)",
            width: "56px"
        },
        paperContent: {
            flexGrow: 1,
            padding: "16px",
            paddingRight: "8px",
            overflow: "auto"
        },
        textInput: {
            minWidth: 120,
            width: "50%",
            paddingRight: "8px"
        }
    })
);

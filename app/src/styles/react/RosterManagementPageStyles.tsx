import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const rosterManagementPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff"
        },
        introPaper: {
            color: theme.palette.text.secondary,
            display: "flex",
            flexDirection: "row",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "rgba(0, 33, 69, 0.03)"
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
            display: "flex",
            flexDirection: "column",
            maxHeight: "calc(100% - 80px)",
            backgroundColor: "rgba(0, 33, 69, 0.03)"
        },
        textInput: {
            minWidth: 120,
            width: "50%",
            paddingRight: "8px"
        },
        contentDivider: {
            marginRight: "8px"
        },
        athleteContentContainer: {
            display: "flex",
            flexDirection: "row",
            flex: "1 1 auto",
            overflow: "auto",
            marginTop: "8px"
        },
        card: {
            width: "calc(50% - 8px)",
            height: "100%",
            marginRight: "8px",
            overflow: "auto"
        },
        athletesContainer: {
            display: "flex",
            flexDirection: "column",
            height: "100%"
        },
        athletesList: {
            flex: "1 1 auto",
            overflow: "auto"
        },
        existingAthletesButton: {
            width: "calc(100% - 16px)",
            margin: "8px"
        },
        newAthletesButton: {
            width: "calc(50% - 16px)",
            margin: "8px"
        },
        uploadPrompt: {
            flexGrow: 1,
            textAlign: "center",
            color: "rgb(0,0,0,0.54)",
            justifyContent: "center",
            flexDirection: "column",
            display: "flex",
            alignContent: "center"
        },
        saveButton: {
            margin: "8px",
            marginLeft: "0px"
        }
    })
);

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Roster Management Page.
 */
export const rosterManagementPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff"
        },
        drawerOpen: {
            width: "calc(100vw - 240px)",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClosed: {
            width: "calc(100vw - 72px)",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        introPaper: {
            color: theme.palette.text.secondary,
            display: "flex",
            flexDirection: "row",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "rgba(0, 33, 69, 0.05)"
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
            padding: "8px",
            paddingRight: "0px",
            display: "flex",
            flexDirection: "column",
            maxHeight: "calc(100% - 80px)",
            backgroundColor: "rgba(0, 33, 69, 0.05)"
        },
        teamInfoContainer: {
            display: "flex",
            flexDirection: "row"
        },
        textInput: {
            minWidth: 120,
            marginTop: "8px",
            paddingRight: "8px",
            flexGrow: 1
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
            width: "calc(100% - 16px)",
            margin: "8px"
        },
        uploadPrompt: {
            flexGrow: 1,
            textAlign: "center",
            color: "rgb(0,0,0,0.54)",
            justifyContent: "center",
            flexDirection: "column",
            display: "flex",
            alignContent: "center",
            height: "calc(100% - 100px)"
        },
        saveButton: {
            margin: "8px",
            marginLeft: "0px",
            width: "70px"
        },
        fileDownload: {
            height: "10%",
            display: "flex",
            alignItems: "center",
            alignSelf: "center"
        },
        downloadLink: {
            cursor: "pointer",
            color: theme.palette.secondary.main
        },
        dropzone: {
            height: "calc(30% - 8px)"
        },
        addedAthletes: {
            flexGrow: 1,
            overflow: "scroll",
            width: "100%"
        },
        createPromptContainer: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center"
        },
        createPrompt: {
            width: "100%",
            textAlign: "center",
            color: "#8a8a8a"
        },
        tabRoot: {
            color: "#fff",
            backgroundColor: theme.palette.primary.dark
        },
        newAthleteContainer: {
            height: "100%",
            width: "100%",
            overflow: "scroll",
            flexGrow: 1
        }
    })
);

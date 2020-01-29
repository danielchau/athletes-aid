import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const profilePageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row"
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
        leftCol: {
            width: "30%",
            height: "100%",
            borderRightWidth: 2,
            borderRightColor: "#EAEAEA",
            borderRightStyle: "solid",
            padding: "16px",
            overflow: "scroll",
            backgroundColor: "rgba(0, 33, 69, 0.05)"
        },
        rightCol: {
            width: "70%",
            height: "100%",
            padding: "16px",
            overflow: "scroll",
            backgroundColor: "#fff"
        },
        profilePicture: {
            width: "calc(32vw - 240px)",
            height: "calc(32vw - 240px)",
            margin: "auto",
            marginBottom: "16px",
            borderWidth: 4,
            borderColor: "#F2A71E",
            borderStyle: "solid",
            fontSize: "4vw",
            color: "#fff",
            backgroundColor: "#6f8296"
        },
        name: {
            textAlign: "center",
            paddingBottom: "8px",
            fontWeight: 500
        },
        heading: {
            paddingBottom: "8px",
            paddingTop: "8px",
            fontWeight: 500
        },
        fileContent: {
            padding: "8px",
            height: "200px",
            width: "100%",
            marginBottom: "16px",
            backgroundColor: "rgba(0, 33, 69, 0.05)"
        },
        injuryDataTableContainer: {
            marginTop: "-16px",
            width: "100%"
        }
    })
);

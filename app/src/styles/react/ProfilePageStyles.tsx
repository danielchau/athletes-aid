import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Profile Page.
 */
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
            }),
            [theme.breakpoints.down("xs")]: {
                width: "100%"
            }
        },
        drawerClosed: {
            width: "calc(100vw - 72px)",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            [theme.breakpoints.down("xs")]: {
                width: "100%"
            }
        },
        leftCol: {
            width: "100%",
            height: "100%",
            borderRightWidth: 2,
            borderRightColor: "#EAEAEA",
            borderRightStyle: "solid",
            padding: "16px",
            overflow: "scroll",
            backgroundColor: "rgba(0, 33, 69, 0.05)"
        },
        rightCol: {
            width: "100%",
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
            backgroundColor: "#6f8296",
            maxWidth: "300px",
            maxHeight: "300px",
            minWidth: "175px",
            minHeight: "175px"
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
            backgroundColor: "rgba(0, 33, 69, 0.05)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflow: "auto"
        },
        injuryDataTableContainer: {
            marginTop: "-16px",
            width: "100%"
        },
        vizPaper: {
            padding: theme.spacing(2),
            marginTop: "8px"
        },
        gridItem: {
            [theme.breakpoints.down("sm")]: {
                height: undefined
            },
            [theme.breakpoints.up("md")]: {
                height: "100%"
            }
        }
    })
);

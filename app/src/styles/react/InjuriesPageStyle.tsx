import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Injuries Page.
 */
export const injuriesPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "16px",
            backgroundColor: "#fff"
        },
        drawerOpen: {
            width: "calc(100vw - 240px)",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            [theme.breakpoints.down("xs")]: {
                width: "100vw"
            }
        },
        drawerClosed: {
            width: "calc(100vw - 72px)",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            [theme.breakpoints.down("xs")]: {
                width: "100vw"
            }
        },
        grid: {
            backgroundColor: "#fff"
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
            backgroundColor: "rgba(0, 33, 69, 0.05)",
            height: "100%"
        },
        vizPaper: {
            padding: theme.spacing(2),
            height: "100%"
        },
        primaryStatisticContainer: {
            display: "flex",
            flexDirection: "column"
        },
        primaryStatisticValue: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "calc((100vw - 240px)/16)"
        },
        primaryStatisticLabel: {
            paddingTop: "16px"
        },
        dateTimeContainer: {},
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200
        },
        dateField: {
            width: 200,
            marginRight: theme.spacing(1),
            marginTop: 0,
            marginBottom: 0
        },
        dateTimeButton: {
            marginLeft: "8px",
            marginTop: "6px"
        }
    })
);

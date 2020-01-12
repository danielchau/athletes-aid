import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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
            })
        },
        drawerClosed: {
            width: "calc(100vw - 60px)",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        grid: {
            backgroundColor: "#fff"
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
            backgroundColor: "rgba(0, 33, 69, 0.03)"
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
        dateTimeButton: {
            marginLeft: "8px",
            marginTop: "6px"
        }
    })
);

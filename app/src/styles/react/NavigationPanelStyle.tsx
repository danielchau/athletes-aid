import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../../constants/constants";

export const navigationPanelStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap"
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            backgroundColor: "#fafafa",
            borderRightWidth: 0
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9) + 1
            },
            backgroundColor: "#fafafa",
            borderRightWidth: 0
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            backgroundColor: "#002145",
            ...theme.mixins.toolbar
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
        drawerListItemText: {
            display: "flex"
        },
        link: {
            textDecoration: "none",
            color: "#000000"
        },
        teamToggleButton: {
            padding: "0px"
        },
        teamToggleList: {
            padding: "0px",
            width: "100%"
        },
        teamToggleListItem: {
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        itemIcon: {
            color: "#002145"
        }
    })
);

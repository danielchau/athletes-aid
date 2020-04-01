import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../../constants/constants";

/**
 * React styles for the left Navigation Panel.
 */
export const navigationPanelStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            [theme.breakpoints.down("xs")]: {
                width: "100%",
                backgroundColor: "transparent",
                boxShadow: "0 6px 19px -3px #585858"
            }
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            backgroundColor: "#fafafa",
            [theme.breakpoints.down("xs")]: {
                width: "100%",
                height: "553px",
                overflow: "hidden"
            }
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
            [theme.breakpoints.down("xs")]: {
                width: "100%",
                height: "553px",
                overflow: "hidden"
            }
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            backgroundColor: "#002145",
            ...theme.mixins.toolbar,
            [theme.breakpoints.down("xs")]: {
                justifyContent: "center"
            }
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
        },
        primaryLabel: {
            fontWeight: 500
        },
        secondaryLabel: {
            fontWeight: 300,
            fontSize: 11
        },
        roleContainer: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: "8px 16px"
        },
        labelContainer: {
            paddingLeft: "32px"
        }
    })
);

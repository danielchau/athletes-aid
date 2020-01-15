import {
    makeStyles,
    Theme,
    createStyles,
    fade
} from "@material-ui/core/styles";
import { drawerWidth } from "../../constants/constants";

export const topBarStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            left: 0,
            top: 0,
            position: "fixed"
        },
        menuButton: {
            marginRight: 24
        },
        hide: {
            display: "none"
        },
        toolbar: {
            backgroundColor: "#002145",
            color: "#fff"
        },
        logo: {
            height: "56px",
            paddingRight: "4px"
        },
        appLogoContainer: {
            flexGrow: 1,
            display: "flex",
            alignItems: "center"
        },
        appLogo: {
            height: "20px"
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.black, 0.05),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.black, 0.15)
            },
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto"
            }
        },
        searchIcon: {
            width: theme.spacing(7),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        inputRoot: {
            color: "inherit"
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: 120,
                "&:focus": {
                    width: 200
                }
            }
        }
    })
);

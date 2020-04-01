import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Main Page which routes to all other pages.
 */
export const pageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column"
        },
        appBarContainer: {
            display: "flex",
            width: "100%",
            height: "64px",
            [theme.breakpoints.down("xs")]: {
                height: "56px"
            }
        },
        pageBodyContainer: {
            display: "flex",
            flexDirection: "row",
            height: "calc(100% - 64px)",
            [theme.breakpoints.down("xs")]: {
                height: "calc(100% - 56px)",
                width: "100%"
            }
        }
    })
);

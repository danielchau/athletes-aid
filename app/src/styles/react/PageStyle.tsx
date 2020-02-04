import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Main Page which routes to all other pages.
 */
export const pageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            width: "100vw",
            height: "100vh",
            flexDirection: "column"
        },
        appBarContainer: {
            display: "flex",
            width: "100%",
            height: "64px"
        },
        pageBodyContainer: {
            display: "flex",
            flexDirection: "row",
            height: "calc(100vh - 64px)"
        }
    })
);

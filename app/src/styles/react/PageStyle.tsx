import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../../constants/constants";

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
            flexDirection: "row"
        }
    })
);

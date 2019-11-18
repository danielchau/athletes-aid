import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const injuryDialogStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: "relative"
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        dialogPaper: {
            height: "100%",
            maxWidth: "600px",
            width: "50%",
            minWidth: "200px",
            position: "fixed",
            bottom: "0",
            right: "0",
            margin: "0"
        }
    })
);

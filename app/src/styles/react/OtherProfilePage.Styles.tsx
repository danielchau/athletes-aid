import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const otherProfilePageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%"
        },
        progressContainer: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center"
        }
    })
);

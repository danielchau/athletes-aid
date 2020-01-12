import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const profilePageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            padding: "16px",
            display: "flex",
            flexDirection: "row"
        },
        leftCol: {
            width: "33%",
            height: "100%",
            borderRightWidth: 2,
            borderRightColor: "#EAEAEA",
            borderRightStyle: "solid",
            paddingRight: "16px",
            overflow: "scroll"
        },
        rightCol: {
            width: "67%",
            height: "100%",
            paddingLeft: "16px",
            overflow: "scroll"
        },
        profilePicture: {
            width: "calc(30vw - 240px)",
            height: "calc(30vw - 240px)",
            margin: "auto",
            marginBottom: "16px"
        },
        heading: {
            paddingBottom: "8px",
            paddingTop: "8px",
            fontWeight: 500
        },
        fileContent: {
            padding: "8px",
            height: "200px",
            width: "100%",
            marginBottom: "16px"
        },
        injuryDataTableContainer: {
            marginTop: "-16px"
        }
    })
);

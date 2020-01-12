import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const profilePageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            display: "flex",
            flexDirection: "row"
        },
        leftCol: {
            width: "33%",
            height: "100%",
            borderRightWidth: 2,
            borderRightColor: "#EAEAEA",
            borderRightStyle: "solid",
            padding: "16px",
            overflow: "scroll",
            backgroundColor: "rgba(0, 33, 69, 0.03)"
        },
        rightCol: {
            width: "67%",
            height: "100%",
            padding: "16px",
            overflow: "scroll",
            backgroundColor: "#fff"
        },
        profilePicture: {
            width: "calc(30vw - 240px)",
            height: "calc(30vw - 240px)",
            margin: "auto",
            marginBottom: "16px",
            borderWidth: 4,
            borderColor: "#F2A71E",
            borderStyle: "solid"
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
            marginBottom: "16px",
            backgroundColor: "rgba(0, 33, 69, 0.03)"
        },
        injuryDataTableContainer: {
            marginTop: "-16px"
        }
    })
);

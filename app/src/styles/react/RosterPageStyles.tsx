import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const rosterPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            padding: "16px",
            height: "100%",
            display: "flex",
            justifyContent: "center"
        },
        tableContainer: {
            width: "100%",
            height: "100%",
            maxWidth: "1000px",
            padding: "16px",
            backgroundColor: "rgba(0, 33, 69, 0.05)"
        },
        table: {
            width: "100%"
        },
        tableBodyContainer: {
            overflow: "auto",
            height: "100%"
        },
        tableBody: {
            tableLayout: "fixed"
        },
        tableRow: {
            cursor: "pointer",
            textDecoration: "none"
        }
    })
);

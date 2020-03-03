import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Add Athletes Table.
 */
export const addAthleteTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            padding: "8px",
            height: "100%",
            display: "flex",
            justifyContent: "center"
        },
        tableContainer: {
            width: "100%",
            height: "100%",
            padding: "8px",
            backgroundColor: "rgba(0, 33, 69, 0.05)",
            overflow: "scroll"
        },
        table: {
            width: "100%"
        },
        tableBodyContainer: {
            width: "2000px",
            overflow: "auto",
            height: "100%"
        },
        tableBody: {
            tableLayout: "fixed"
        },
        tableRow: {
            cursor: "pointer"
        },
        tooltip: {
            backgroundColor: "#fff",
            color: "#4f4f4f",
            boxShadow: theme.shadows[1]
        }
    })
);

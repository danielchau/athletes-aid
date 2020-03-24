import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Roster Page.
 */
export const rosterPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            padding: "16px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
        },
        tableContainer: {
            width: "100%",
            height: "calc(100% - 72px)",
            maxWidth: "1000px",
            padding: "16px",
            backgroundColor: "rgba(0, 33, 69, 0.05)"
        },
        searchBarContainer: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            maxWidth: "1000px"
        },
        searchBar: {
            flexGrow: 1,
            maxWidth: "1000px",
            marginBottom: "16px"
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
        },
        dropdownMenu: {
            padding: "10px"
        },
        chips: {
            display: "flex",
            flexWrap: "wrap",
            overflow: "auto"
        },
        chip: {
            margin: 2
        }
    })
);

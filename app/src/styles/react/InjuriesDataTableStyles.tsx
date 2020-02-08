import { makeStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";

/**
 * React styles for the Injury Data Table.
 */
export const injuriesDataTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            marginTop: theme.spacing(3)
        },
        paper: {
            width: "100%",
            marginBottom: theme.spacing(2),
            backgroundColor: "rgba(0, 33, 69, 0.05)"
        },
        table: {
            minWidth: 750
        },
        tableWrapper: {
            overflowX: "auto"
        },
        tableRow: {
            cursor: "pointer"
        },
        visuallyHidden: {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: -1,
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            top: 20,
            width: 1
        }
    })
);

/**
 * React styles for the Injury Data Table Toolbar Header.
 */
export const injuriesDataTableToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1)
        },
        highlight:
            theme.palette.type === "light"
                ? {
                      color: theme.palette.primary.main,
                      backgroundColor: lighten(theme.palette.primary.light, 0.85)
                  }
                : {
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.secondary.dark
                  },
        title: {
            flex: "1 1 100%"
        },
        export: {
            margin: "auto",
            color: theme.palette.secondary.main,
            display: "flex"
        }
    })
);

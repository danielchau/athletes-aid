import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

/**
 * React styles for the Body Visualization.
 */
export const bodyVisualizationStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%"
        },
        imageContainer: {
            position: "relative",
            alignSelf: "center"
        },
        image: {
            width: "100%"
        },
        dot: {
            height: "15px",
            width: "15px",
            position: "absolute",
            borderRadius: "15px"
        },
        legendContainer: {
            borderLeft: "#dedede solid 1px"
        },
        legendItem: {
            display: "flex",
            color: "rgba(0, 0, 0, 0.54)",
            marginBottom: "2px"
        },
        dotLegend: {
            height: "10px",
            width: "10px",
            borderRadius: "10px",
            marginTop: "6px",
            marginRight: "4px"
        }
    })
);

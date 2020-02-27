import React from "react";
import { Injury } from "../util/types";
import { bodyVisualizationStyles } from "../styles/react/BodyVisualizationStyles";
// @ts-ignore
import Body from "../util/body.jpg";
import { Grid, Typography, Divider } from "@material-ui/core";

interface BodyVisualizationProps {
    injuries: Injury[];
}

export default function BodyVisualization(props: BodyVisualizationProps) {
    const classes = bodyVisualizationStyles({});

    const getStyles = (injury: Injury | string, isLegend: boolean) => {
        let color = "";
        let left = 0;
        let top = 0;

        let key = typeof injury == "string" ? injury : injury.locationOnBody;

        switch (key) {
            case "Abdominals":
                color = "#FE4365";
                top = 35;
                left = 24;
                break;
            case "Ankle":
                color = "#FC9D9A";
                top = 89;
                left = 70;
                break;
            case "Back":
                color = "#F9CDAD";
                top = 28;
                left = 69.25;
                break;
            case "Biceps":
                color = "#C8C8A9";
                top = 31;
                left = 37;
                break;
            case "Cervical":
                color = "#83AF9B";
                top = 15;
                left = 69.25;
                break;
            case "Chest":
                color = "#DBBD5C";
                top = 27;
                left = 23.25;
                break;
            case "Elbow":
                color = "#62E043";
                top = 39;
                left = 15;
                break;
            case "Foot":
                color = "#FFFDB2";
                top = 91;
                left = 24;
                break;
            case "Forearms":
                color = "#B56A29";
                top = 43;
                left = 37;
                break;
            case "Hamstring/Thigh":
                color = "#DD7156";
                top = 60;
                left = 61;
                break;
            case "Hand":
                color = "#B7D145";
                top = 50;
                left = 87;
                break;
            case "Head/Face":
                color = "#E59CDC";
                top = 7;
                left = 23;
                break;
            case "Hip/Pelvis":
                color = "#AC96EA";
                top = 45;
                left = 17;
                break;
            case "Knee":
                color = "#EABF48";
                top = 68;
                left = 20;
                break;
            case "Lower Leg/Calf":
                color = "#F4A4EF";
                top = 75;
                left = 29;
                break;
            case "Neck/Spine":
                color = "#FFA5C9";
                top = 19;
                left = 69.25;
                break;
            case "Quadriceps":
                color = "#3EC98F";
                top = 57;
                left = 32;
                break;
            case "Shin":
                color = "#B2FFE2";
                top = 78;
                left = 18;
                break;
            case "Shoulder/Proximal Humerous":
                color = "#C0B3F9";
                top = 19;
                left = 61;
                break;
            case "Trapezius":
                color = "#55E85D";
                top = 20;
                left = 73;
                break;
            case "Triceps":
                color = "#0BEFBE";
                top = 31;
                left = 82;
                break;
            case "Wrist":
                color = "#9DB2E8";
                top = 49;
                left = 9;
                break;
            default:
                color = "#10B23B";
                top = 88;
                left = 47;
                break;
        }

        return isLegend
            ? {
                  backgroundColor: color
              }
            : {
                  backgroundColor: color,
                  left: left + "%",
                  top: top + "%"
              };
    };

    const getLegend = () => {
        let injuryLocations = new Map();

        props.injuries.forEach(i => {
            if (injuryLocations.has(i.locationOnBody)) {
                injuryLocations.set(i.locationOnBody, injuryLocations.get(i.locationOnBody) + 1);
            } else {
                injuryLocations.set(i.locationOnBody, 1);
            }
        });

        return Array.from(injuryLocations.keys()).map(i => (
            <div className={classes.legendItem}>
                <div className={classes.dotLegend} style={getStyles(i, true)} />
                <Typography variant="body1">
                    {i +
                        " (" +
                        injuryLocations.get(i) +
                        " / " +
                        (injuryLocations.get(i) / props.injuries.length) * 100 +
                        "%)"}
                </Typography>
            </div>
        ));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3} style={{ height: "100%", margin: "0px" }}>
                <Grid item xs={6} className={classes.imageContainer}>
                    <img className={classes.image} src={Body}></img>
                    {props.injuries.map(i => (
                        <div className={classes.dot} style={getStyles(i, false)} />
                    ))}
                </Grid>
                <Grid item xs={6} className={classes.legendContainer}>
                    <Typography variant="h6">Injuries Breakdown</Typography>
                    <Divider light style={{ marginBottom: "8px" }} />
                    {getLegend()}
                </Grid>
            </Grid>
        </div>
    );
}

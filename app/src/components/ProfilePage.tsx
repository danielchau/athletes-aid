import React from "react";
import { AthleteProfile } from "../util/types";
import { profilePageStyles } from "../styles/react/ProfilePageStyles";
import { Avatar, Typography, Divider, Paper } from "@material-ui/core";
import InjuriesDataTable from "./InjuriesDataTable";

interface ProfilePageProps {
    currentAthlete: AthleteProfile;
}

export default function ProfilePage(props: ProfilePageProps) {
    const classes = profilePageStyles({});
    const [injuryOpen, setInjuryOpen] = React.useState(false);

    const handleInjuryOpen = () => {
        setInjuryOpen(true);
    };

    const handleInjuryClose = () => {
        setInjuryOpen(false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.leftCol}>
                <Avatar
                    className={classes.profilePicture}
                    src={props.currentAthlete.profilePicture}
                ></Avatar>
                <Divider light />
                <Typography className={classes.heading} variant="h5">
                    Basic Information
                </Typography>
                {[
                    ["Name", props.currentAthlete.name],
                    ["Birthdate", props.currentAthlete.birthdate],
                    ["Year In School", props.currentAthlete.schoolYear],
                    ["Gender", props.currentAthlete.gender],
                    ["Weight", props.currentAthlete.weight + " kg"],
                    ["Height", props.currentAthlete.height + " cm"]
                ].map(([category, value]) => (
                    <ProfileAttribute
                        category={category.toString()}
                        value={value.toString()}
                    />
                ))}
                <Divider light />
                <Typography className={classes.heading} variant="h5">
                    Contact Information
                </Typography>
                {[
                    ["Email", props.currentAthlete.email],
                    ["Cell Phone", props.currentAthlete.cellPhone],
                    ["Home Phone", props.currentAthlete.homePhone]
                ].map(([category, value]) => (
                    <ProfileAttribute
                        category={category.toString()}
                        value={value.toString()}
                    />
                ))}
                <Divider light />
                <Typography className={classes.heading} variant="h5">
                    Emergency Contact Information
                </Typography>
                {[
                    ["Name", props.currentAthlete.emergencyContact.name],
                    ["Email", props.currentAthlete.emergencyContact.email],
                    [
                        "Cell Phone",
                        props.currentAthlete.emergencyContact.cellPhone
                    ],
                    [
                        "Home Phone",
                        props.currentAthlete.emergencyContact.homePhone
                    ]
                ].map(([category, value]) => (
                    <ProfileAttribute
                        category={category.toString()}
                        value={value.toString()}
                    />
                ))}
                <Divider light />
            </div>
            <div className={classes.rightCol}>
                <Typography className={classes.heading} variant="h5">
                    Files / Forms
                </Typography>
                <Paper className={classes.fileContent}></Paper>
                <Divider light />
                <Typography className={classes.heading} variant="h5">
                    Injuries
                </Typography>
                <div className={classes.injuryDataTableContainer}>
                    <InjuriesDataTable
                        injuries={props.currentAthlete.injuries}
                        injuryOpen={injuryOpen}
                        handleInjuryOpen={handleInjuryOpen}
                        handleInjuryClose={handleInjuryClose}
                    ></InjuriesDataTable>
                </div>
            </div>
        </div>
    );
}

interface ProfileAttributeProps {
    category: string;
    value: string;
}

function ProfileAttribute(props: ProfileAttributeProps) {
    return (
        <div style={{ display: "flex", paddingBottom: "4px" }}>
            <Typography
                variant="body1"
                style={{ paddingRight: "4px", fontWeight: 400 }}
            >
                {props.category}:
            </Typography>
            <Typography style={{ fontWeight: 300 }} variant="body1">
                {props.value}
            </Typography>
        </div>
    );
}

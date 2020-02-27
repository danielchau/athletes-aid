import React from "react";
import {
    User,
    NavigationPanelStates,
    AthleteInjuries,
    Team,
    AthleteProfile,
    Athlete
} from "../util/types";
import { profilePageStyles } from "../styles/react/ProfilePageStyles";
import { Avatar, Typography, Divider, Paper, IconButton, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import InjuriesDataTable from "./InjuriesDataTable";
import clsx from "clsx";
import ProfilePageInfo from "./ProfilePageInfo";
import FetchingScreen from "./FetchingScreen";
import BodyVisualization from "./BodyVisualization";

interface ProfilePageProps {
    state: NavigationPanelStates;
    currentAthlete: AthleteProfile;
    currentUser: User;
    canEdit: boolean;
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) => AthleteInjuries;
    startingDate: Date;
    endingDate: Date;
    selectedTeam: Team;
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}

/**
 * Profile page displays an athlete profile which includes:
 * Basic information, files and forms, and a data table of the injuries related to the athlete.
 * @param props
 */
export default function ProfilePage(props: ProfilePageProps) {
    const classes = profilePageStyles({});
    const [injuryOpen, setInjuryOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false);

    const handleInjuryOpen = () => {
        setInjuryOpen(true);
    };

    const handleInjuryClose = () => {
        setInjuryOpen(false);
    };

    const onEditClick = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setIsUpdating(true);
        }
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.drawerOpen]: props.state === NavigationPanelStates.open,
                [classes.drawerClosed]: !(props.state === NavigationPanelStates.open)
            })}
        >
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={4} className={classes.gridItem}>
                    <div className={classes.leftCol}>
                        {isUpdating && <FetchingScreen />}
                        <div style={{ visibility: isUpdating ? "hidden" : "visible" }}>
                            {props.canEdit && (
                                <IconButton
                                    style={{
                                        color: isEditing ? "#0055B7" : "#F2A71E",
                                        position: "absolute"
                                    }}
                                    onClick={onEditClick}
                                >
                                    {isEditing ? <CheckIcon /> : <EditIcon />}
                                </IconButton>
                            )}
                            {props.currentAthlete.profilePicture == "" ? (
                                <Avatar className={classes.profilePicture}>
                                    {props.currentAthlete.name.substr(0, 1)}
                                </Avatar>
                            ) : (
                                <Avatar
                                    className={classes.profilePicture}
                                    src={props.currentAthlete.profilePicture}
                                ></Avatar>
                            )}
                            <Typography className={classes.name} variant="h4">
                                {props.currentAthlete.name}
                            </Typography>
                            <Divider light />
                            <ProfilePageInfo
                                currentAthlete={props.currentAthlete}
                                isEditing={isEditing}
                                setIsUpdating={setIsUpdating}
                                currentUser={props.currentUser}
                            />
                            <Divider light />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={8} className={classes.gridItem}>
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
                                getAthleteInjuries={props.getAthleteInjuries}
                                startingDate={props.startingDate}
                                endingDate={props.endingDate}
                                selectedTeam={props.selectedTeam}
                                currentUser={props.currentUser}
                                getCurrentRoster={props.getCurrentRoster}
                            ></InjuriesDataTable>
                        </div>
                        <Divider light />
                        <Paper className={classes.vizPaper}>
                            <BodyVisualization injuries={props.currentAthlete.injuries} />
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

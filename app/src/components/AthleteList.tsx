import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { rosterManagementPageStyles } from "../styles/react/RosterManagementPageStyles";
import { ListAthlete } from "../util/types";

interface AthleteListProps {
    athletes: ListAthlete[];
    checked: Set<string>;
    handleToggle: (val: any) => void;
}

export default function AthleteList(props: AthleteListProps) {
    const classes = rosterManagementPageStyles({});
    return (
        <List dense className={classes.athletesList}>
            {props.athletes.map((athlete: ListAthlete, idx: number) => {
                const labelId = `checkbox-list-name-label-${athlete.name}`;
                const birthdateId = `checkbox-list-birthdate-label-${idx}`;
                return (
                    <ListItem key={athlete.id} button>
                        <ListItemAvatar>
                            <Avatar alt={`Avatar n°${athlete.id}`}>
                                {athlete.name.slice(0, 1)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={athlete.name} />
                        {!!athlete.birthdate && (
                            <ListItemText
                                id={birthdateId}
                                primary={athlete.birthdate}
                            />
                        )}
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={() => props.handleToggle(athlete.id)}
                                checked={props.checked.has(athlete.id)}
                                inputProps={{
                                    "aria-labelledby": labelId
                                }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}

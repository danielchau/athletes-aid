import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { rosterManagementPageStyles } from "../styles/react/RosterManagementPageStyles";
import { ListAthlete } from "../util/types";

interface AthleteListProps {
    athletes: ListAthlete[];
    checked: Set<string>;
    handleToggle: (val: any) => void;
}

/**
 * Athlete List displays athletes and their birthdate (if present) in a list format.
 * Athletes are selectable on click of the checkbox.
 * Pass in a custom on click function if you wish to add functionality to the toggle.
 * @param props
 */
export default function AthleteList(props: AthleteListProps) {
    const classes = rosterManagementPageStyles({});
    const [autocompleteVal, setAutocompleteVal] = React.useState<string>("");
    const [athletes, setAthletes] = React.useState<ListAthlete[]>(props.athletes);

    const handleAutocompleteChange = (event: React.ChangeEvent<{ value: string }>) => {
        let value = event.target.value;

        setAutocompleteVal(value);

        var reg = new RegExp(
            value
                .split("")
                .join("\\w*")
                .replace(/\W/, ""),
            "i"
        );
        let newAthletes = props.athletes.filter(a => {
            if (a.name.match(reg)) {
                return a;
            }
        });

        setAthletes(newAthletes);
    };

    return (
        <div className={classes.athletesList} style={{ paddingTop: "8px" }}>
            <TextField
                label="Search Athlete..."
                variant="outlined"
                fullWidth
                value={autocompleteVal}
                onChange={handleAutocompleteChange}
            />
            <div className={classes.innerList}>
                <List dense>
                    {athletes.map((athlete: ListAthlete, idx: number) => {
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
                                    <ListItemText id={birthdateId} primary={athlete.birthdate} />
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
            </div>
        </div>
    );
}

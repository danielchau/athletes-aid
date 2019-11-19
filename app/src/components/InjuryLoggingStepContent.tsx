import * as React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { injuryLoggingStepContentStyles } from "../styles/react/InjuryLoggingStepContentStyles";
import { Athlete, Team, Injury } from "../util/types";
import {
    eventTypes,
    positions,
    sidesOfBody,
    bodyLocations,
    injuryTypes,
    severities,
    playerStatuses,
    mechanismsOfInjury
} from "../constants/constants";

interface InjuryLoggingStepContentProps {
    stepIndex: number;
    selectedTeam: Team;
    existingInjury: Injury | null;
}

type StringChangeEvent = React.ChangeEvent<{ value: string }>;
type StringTextContentChangeEvent = React.ChangeEvent<{ textContent: string }>;
type NumberChangeEvent = React.ChangeEvent<{ value: number }>;

export default function InjuryLoggingStepContent(
    props: InjuryLoggingStepContentProps
) {
    const classes = injuryLoggingStepContentStyles({});
    const [selectedAthlete, setSelectedAthlete] = React.useState(
        !!props.existingInjury ? props.existingInjury.athleteName : ""
    );
    const [selectedDate, setSelectedDate] = React.useState<Date>(
        !!props.existingInjury ? props.existingInjury.injuryDate : new Date()
    );
    const [isSportsRelated, setIsSportsRelated] = React.useState(
        !!props.existingInjury ? props.existingInjury.isSportsRelated : false
    );
    const [selectedEventType, setSelectedEventType] = React.useState(
        !!props.existingInjury ? props.existingInjury.eventType : ""
    );
    const [selectedPosition, setSelectedPosition] = React.useState(
        !!props.existingInjury ? props.existingInjury.position : ""
    );
    const [selectedSideOfBody, setSelectedSideOfBody] = React.useState(
        !!props.existingInjury ? props.existingInjury.sideOfBody : ""
    );
    const [selectedLocationOnBody, setSelectedLocationOnBody] = React.useState(
        !!props.existingInjury ? props.existingInjury.locationOnBody : ""
    );
    const [selectedInjuryType, setSelectedInjuryType] = React.useState(
        !!props.existingInjury ? props.existingInjury.injuryType : ""
    );
    const [selectedSeverity, setSelectedSeverity] = React.useState(
        !!props.existingInjury ? props.existingInjury.severity : 0
    );
    const [selectedStatus, setSelectedStatus] = React.useState(
        !!props.existingInjury ? props.existingInjury.status : ""
    );
    const [
        selectedMechanismOfInjury,
        setSelectedMechanismOfInjury
    ] = React.useState(
        !!props.existingInjury ? props.existingInjury.mechanism : ""
    );
    const [injuryDescription, setInjuryDescription] = React.useState(
        !!props.existingInjury ? props.existingInjury.injuryDescription : ""
    );
    const [otherNotes, setOtherNotes] = React.useState(
        !!props.existingInjury
            ? "Notes can't be altered. See all injury notes on overview page."
            : ""
    );

    const handleAthleteChange = (event: StringTextContentChangeEvent) => {
        setSelectedAthlete(event.target.textContent);
    };
    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };
    const handleSportRelatedChange = (
        _: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        setIsSportsRelated(checked);
    };
    const handleEventTypeChange = (event: StringChangeEvent) => {
        setSelectedEventType(event.target.value);
    };
    const handlePositionChange = (event: StringChangeEvent) => {
        setSelectedPosition(event.target.value);
    };
    const handleSideOfBodyChange = (event: StringChangeEvent) => {
        setSelectedSideOfBody(event.target.value);
    };
    const handleLocationOnBodyChange = (event: StringChangeEvent) => {
        setSelectedLocationOnBody(event.target.value);
    };
    const handleInjuryTypeChange = (event: StringChangeEvent) => {
        setSelectedInjuryType(event.target.value);
    };
    const handleSeverityChange = (event: NumberChangeEvent) => {
        setSelectedSeverity(event.target.value);
    };
    const handleStatusChange = (event: StringChangeEvent) => {
        setSelectedStatus(event.target.value);
    };
    const handleMechanismChange = (event: StringChangeEvent) => {
        setSelectedMechanismOfInjury(event.target.value);
    };
    const handleDescriptionChange = (event: StringChangeEvent) => {
        setInjuryDescription(event.target.value);
    };
    const handleOtherNotesChange = (event: StringChangeEvent) => {
        setOtherNotes(event.target.value);
    };

    const selectedTeam = !!props.existingInjury
        ? props.existingInjury.teamName
        : props.selectedTeam.name;

    switch (props.stepIndex) {
        case 0:
            return (
                <>
                    <Typography className={classes.instructions}>
                        Please input the following information regarding the
                        injury.
                    </Typography>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="team-select-label">
                            Team Name
                        </InputLabel>
                        <Select
                            labelWidth={90}
                            id="team-select"
                            value={selectedTeam}
                            inputProps={{ readOnly: true }}
                        >
                            <MenuItem value={selectedTeam}>
                                {selectedTeam}
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        {!!props.existingInjury ? (
                            <>
                                <InputLabel id="athlete-select-label">
                                    Athlete Name
                                </InputLabel>
                                <Select
                                    labelWidth={90}
                                    id="athlete-select"
                                    value={props.existingInjury.athleteName}
                                    inputProps={{ readOnly: true }}
                                >
                                    <MenuItem
                                        value={props.existingInjury.athleteName}
                                    >
                                        {props.existingInjury.athleteName}
                                    </MenuItem>
                                </Select>
                            </>
                        ) : (
                            <Autocomplete
                                id="athlete-select"
                                options={props.selectedTeam.athletes}
                                getOptionLabel={(option: Athlete) =>
                                    option.name
                                }
                                onChange={handleAthleteChange}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: "off"
                                        }}
                                        label="Athlete Name"
                                        variant="outlined"
                                        defaultValue={
                                            !!props.existingInjury
                                                ? props.existingInjury
                                                      .athleteName
                                                : ""
                                        }
                                        fullWidth
                                    />
                                )}
                            />
                        )}
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className={classes.dateInput}
                            disableToolbar
                            inputVariant="outlined"
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-select"
                            label="Injury Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    <FormControlLabel
                        className={classes.checkboxInput}
                        control={
                            <Checkbox
                                color="primary"
                                value={isSportsRelated}
                                onChange={handleSportRelatedChange}
                            />
                        }
                        label="Sports Related"
                    />
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="event-type-select-label">
                            Event Type
                        </InputLabel>
                        <Select
                            labelWidth={80}
                            id="event-type-select"
                            value={selectedEventType}
                            onChange={handleEventTypeChange}
                        >
                            <MenuItem value="" disabled>
                                Select where injury took place...
                            </MenuItem>
                            {eventTypes.map((event: string, i: number) => (
                                <MenuItem key={i} value={event}>
                                    {event}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="position-select-label">
                            Position
                        </InputLabel>
                        <Select
                            labelWidth={60}
                            id="position-select"
                            value={selectedPosition}
                            onChange={handlePositionChange}
                        >
                            <MenuItem value="" disabled>
                                Select position of athlete...
                            </MenuItem>
                            {positions.map((position: string, i: number) => (
                                <MenuItem key={i} value={position}>
                                    {position}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="side-of-body-select-label">
                            Side Of Body
                        </InputLabel>
                        <Select
                            labelWidth={100}
                            id="side-of-body-select"
                            value={selectedSideOfBody}
                            onChange={handleSideOfBodyChange}
                        >
                            <MenuItem value="" disabled>
                                Select side of body...
                            </MenuItem>
                            {sidesOfBody.map((side: string, i: number) => (
                                <MenuItem key={i} value={side}>
                                    {side}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="body-location-select-label">
                            Location On Body
                        </InputLabel>
                        <Select
                            labelWidth={130}
                            id="body-location-select"
                            value={selectedLocationOnBody}
                            onChange={handleLocationOnBodyChange}
                        >
                            <MenuItem value="" disabled>
                                Select injury location...
                            </MenuItem>
                            {bodyLocations.map(
                                (location: string, i: number) => (
                                    <MenuItem key={i} value={location}>
                                        {location}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="injury-type-select-label">
                            Injury Type
                        </InputLabel>
                        <Select
                            labelWidth={80}
                            id="injury-type-select"
                            value={selectedInjuryType}
                            onChange={handleInjuryTypeChange}
                        >
                            <MenuItem value="" disabled>
                                Select type of injury...
                            </MenuItem>
                            {injuryTypes.map((type: string, i: number) => (
                                <MenuItem key={i} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="severity-select-label">
                            Severity
                        </InputLabel>
                        <Select
                            labelWidth={60}
                            id="severity-select"
                            value={selectedSeverity}
                            onChange={handleSeverityChange}
                        >
                            <MenuItem value="" disabled>
                                Select severity of injury...
                            </MenuItem>
                            {severities.map((severity: number, i: number) => (
                                <MenuItem key={i} value={severity}>
                                    {severity}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            );
        case 1:
            return (
                <>
                    <Typography className={classes.instructions}>
                        Please input further details about the injury.
                    </Typography>
                    <FormControl className={classes.textInput}>
                        <FormControl
                            className={classes.multilineInput}
                            variant="outlined"
                        >
                            <InputLabel id="status-select-label">
                                Status
                            </InputLabel>
                            <Select
                                labelWidth={50}
                                id="status-select"
                                value={selectedStatus}
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="" disabled>
                                    Select status of athlete...
                                </MenuItem>
                                {playerStatuses.map(
                                    (status: string, i: number) => (
                                        <MenuItem key={i} value={status}>
                                            {status}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                        <FormControl
                            className={classes.multilineInput}
                            variant="outlined"
                        >
                            <InputLabel id="mechanism-select-label">
                                Mechanism of Injury
                            </InputLabel>
                            <Select
                                labelWidth={145}
                                id="mechanism-select"
                                value={selectedMechanismOfInjury}
                                onChange={handleMechanismChange}
                            >
                                <MenuItem value="" disabled>
                                    Select mechanism of injury...
                                </MenuItem>
                                {mechanismsOfInjury.map(
                                    (mechanism: string, i: number) => (
                                        <MenuItem key={i} value={mechanism}>
                                            {mechanism}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                        <TextField
                            id="injury-description"
                            className={classes.multilineInput}
                            label="Injury Description"
                            multiline
                            rows="4"
                            placeholder="Optional"
                            margin="normal"
                            variant="outlined"
                            value={injuryDescription}
                            onChange={handleDescriptionChange}
                        />
                        <TextField
                            id="other-notes"
                            className={classes.multilineInput}
                            label="Other Notes"
                            multiline
                            rows="4"
                            placeholder="Optional"
                            margin="normal"
                            variant="outlined"
                            value={otherNotes}
                            onChange={handleOtherNotesChange}
                            disabled={!!props.existingInjury}
                        />
                    </FormControl>
                </>
            );
        case 2:
            return (
                <div>
                    <Typography className={classes.instructions}>
                        Please review the following information before
                        finishing.
                    </Typography>
                    <p>
                        <b>Team Name: </b>
                        {selectedTeam}
                    </p>
                    <p>
                        <b>Athlete Name: </b>
                        {selectedAthlete}
                    </p>
                    <Divider light></Divider>
                    <p>
                        <b>Injury Date: </b>
                        {selectedDate.toDateString()}
                    </p>
                    <p>
                        <b>Is Sport Related: </b>
                        {isSportsRelated ? "Yes" : "No"}
                    </p>
                    <p>
                        <b>Event Type: </b>
                        {selectedEventType}
                    </p>
                    <p>
                        <b>Position: </b>
                        {selectedPosition}
                    </p>
                    <p>
                        <b>Side Of Body: </b>
                        {selectedSideOfBody}
                    </p>
                    <p>
                        <b>Location On Body: </b>
                        {selectedLocationOnBody}
                    </p>
                    <p>
                        <b>Injury Type: </b>
                        {selectedInjuryType}
                    </p>
                    <p>
                        <b>Severity: </b>
                        {selectedSeverity}
                    </p>
                    <Divider light></Divider>
                    <p>
                        <b>Status: </b>
                        {selectedStatus}
                    </p>
                    <p>
                        <b>Mechanism Of Injury: </b>
                        {selectedMechanismOfInjury}
                    </p>
                    <Divider light></Divider>
                    <p>
                        <b>Injury Description: </b>
                        {injuryDescription}
                    </p>
                    <p>
                        <b>Other Notes: </b>
                        {otherNotes}
                    </p>
                </div>
            );
        default:
            return <></>;
    }
}

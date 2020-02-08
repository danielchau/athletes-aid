import * as React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { injuryLoggingStepContentStyles } from "../styles/react/InjuryLoggingStepContentStyles";
import { Athlete, Team, Injury } from "../util/types";
import {
    eventTypes,
    sidesOfBody,
    bodyLocations,
    injuryTypes,
    severities,
    playerStatuses,
    mechanismsOfInjury,
    severityDescriptions
} from "../constants/constants";

interface InjuryLoggingStepContentProps {
    stepIndex: number;
    selectedTeam: Team;
    currentRoster: Athlete[];
    existingInjury: Injury | null;
    selectedAthlete: string;
    setSelectedAthlete: any;
    selectedDate: Date;
    setSelectedDate: any;
    isSportsRelated: boolean;
    setIsSportsRelated: any;
    selectedEventType: string;
    setSelectedEventType: any;
    selectedSideOfBody: string;
    setSelectedSideOfBody: any;
    selectedLocationOnBody: string;
    setSelectedLocationOnBody: any;
    selectedInjuryType: string;
    setSelectedInjuryType: any;
    selectedSeverity: number;
    setSelectedSeverity: any;
    selectedStatus: string;
    setSelectedStatus: any;
    selectedMechanismOfInjury: string;
    setSelectedMechanismOfInjury: any;
    injuryDescription: string;
    setInjuryDescription: any;
    otherNotes: string;
    setOtherNotes: any;
}

type StringChangeEvent = React.ChangeEvent<{ value: string }>;
type StringTextContentChangeEvent = React.ChangeEvent<{ textContent: string }>;
type NumberChangeEvent = React.ChangeEvent<{ value: number }>;

/**
 * Injury Logging Step Content displays the content depending on what stage of the logging process
 * the user is at.
 * @param props
 */
export default function InjuryLoggingStepContent(props: InjuryLoggingStepContentProps) {
    const classes = injuryLoggingStepContentStyles({});

    const handleAthleteChange = (event: StringTextContentChangeEvent) => {
        props.setSelectedAthlete(event.target.textContent);
    };
    const handleDateChange = (date: Date) => {
        props.setSelectedDate(date);
    };
    const handleSportRelatedChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        props.setIsSportsRelated(checked);
    };
    const handleEventTypeChange = (event: StringChangeEvent) => {
        props.setSelectedEventType(event.target.value);
    };
    const handleSideOfBodyChange = (event: StringChangeEvent) => {
        props.setSelectedSideOfBody(event.target.value);
    };
    const handleLocationOnBodyChange = (event: StringChangeEvent) => {
        props.setSelectedLocationOnBody(event.target.value);
    };
    const handleInjuryTypeChange = (event: StringChangeEvent) => {
        props.setSelectedInjuryType(event.target.value);
    };
    const handleSeverityChange = (event: NumberChangeEvent) => {
        props.setSelectedSeverity(event.target.value);
    };
    const handleStatusChange = (event: StringChangeEvent) => {
        props.setSelectedStatus(event.target.value);
    };
    const handleMechanismChange = (event: StringChangeEvent) => {
        props.setSelectedMechanismOfInjury(event.target.value);
    };
    const handleDescriptionChange = (event: StringChangeEvent) => {
        props.setInjuryDescription(event.target.value);
    };
    const handleOtherNotesChange = (event: StringChangeEvent) => {
        props.setOtherNotes(event.target.value);
    };

    const selectedTeam = !!props.existingInjury
        ? props.existingInjury.teamName
        : props.selectedTeam.name;

    switch (props.stepIndex) {
        case 0:
            return (
                <>
                    <Typography className={classes.instructions}>
                        Please input the following information regarding the injury.
                    </Typography>
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="team-select-label">Team Name *</InputLabel>
                        <Select
                            labelWidth={100}
                            id="team-select"
                            value={props.selectedTeam.name}
                            inputProps={{ readOnly: true }}
                        >
                            <MenuItem value={props.selectedTeam.name}>
                                {props.selectedTeam.name}
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} variant="outlined">
                        {!!props.existingInjury ? (
                            <>
                                <InputLabel id="athlete-select-label">Athlete Name *</InputLabel>
                                <Select
                                    labelWidth={100}
                                    id="athlete-select"
                                    value={props.existingInjury.athleteName}
                                    inputProps={{ readOnly: true }}
                                >
                                    <MenuItem value={props.existingInjury.athleteName}>
                                        {props.existingInjury.athleteName}
                                    </MenuItem>
                                </Select>
                            </>
                        ) : (
                            <Autocomplete
                                id="athlete-select"
                                options={props.currentRoster}
                                getOptionLabel={(option: Athlete) => option.name}
                                onChange={handleAthleteChange}
                                inputValue={props.selectedAthlete}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: "off"
                                        }}
                                        label="Athlete Name *"
                                        variant="outlined"
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
                            label="Injury Date *"
                            value={props.selectedDate}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    <FormControlLabel
                        className={classes.checkboxInput}
                        control={
                            <Checkbox
                                color="primary"
                                value={props.isSportsRelated}
                                onChange={handleSportRelatedChange}
                            />
                        }
                        label="Sports Related"
                    />
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="event-type-select-label">Event Type *</InputLabel>
                        <Select
                            labelWidth={90}
                            id="event-type-select"
                            value={props.selectedEventType}
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
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="side-of-body-select-label">Side Of Body</InputLabel>
                        <Select
                            labelWidth={100}
                            id="side-of-body-select"
                            value={props.selectedSideOfBody}
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
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="body-location-select-label">Location On Body *</InputLabel>
                        <Select
                            labelWidth={140}
                            id="body-location-select"
                            value={props.selectedLocationOnBody}
                            onChange={handleLocationOnBodyChange}
                        >
                            <MenuItem value="" disabled>
                                Select injury location...
                            </MenuItem>
                            {bodyLocations.map((location: string, i: number) => (
                                <MenuItem key={i} value={location}>
                                    {location}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="injury-type-select-label">Injury Type *</InputLabel>
                        <Select
                            labelWidth={90}
                            id="injury-type-select"
                            value={props.selectedInjuryType}
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
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="severity-select-label">Severity *</InputLabel>
                        <Select
                            labelWidth={70}
                            id="severity-select"
                            value={props.selectedSeverity}
                            onChange={handleSeverityChange}
                        >
                            <MenuItem value="" disabled>
                                Select severity of injury...
                            </MenuItem>
                            {severities.map((severity: number, i: number) => (
                                <MenuItem key={i} value={severity}>
                                    {severity} - {severityDescriptions[i]}
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
                        <FormControl className={classes.multilineInput} variant="outlined">
                            <InputLabel id="status-select-label">Status *</InputLabel>
                            <Select
                                labelWidth={60}
                                id="status-select"
                                value={props.selectedStatus}
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="" disabled>
                                    Select status of athlete...
                                </MenuItem>
                                {playerStatuses.map((status: string, i: number) => (
                                    <MenuItem key={i} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.multilineInput} variant="outlined">
                            <InputLabel id="mechanism-select-label">
                                Mechanism of Injury *
                            </InputLabel>
                            <Select
                                labelWidth={155}
                                id="mechanism-select"
                                value={props.selectedMechanismOfInjury}
                                onChange={handleMechanismChange}
                            >
                                <MenuItem value="" disabled>
                                    Select mechanism of injury...
                                </MenuItem>
                                {mechanismsOfInjury.map((mechanism: string, i: number) => (
                                    <MenuItem key={i} value={mechanism}>
                                        {mechanism}
                                    </MenuItem>
                                ))}
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
                            value={props.injuryDescription}
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
                            value={props.otherNotes}
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
                        Please review the following information before finishing.
                    </Typography>
                    <p>
                        <b>Team Name: </b>
                        {selectedTeam}
                    </p>
                    <p>
                        <b>Athlete Name: </b>
                        {props.selectedAthlete}
                    </p>
                    <Divider light></Divider>
                    <p>
                        <b>Injury Date: </b>
                        {props.selectedDate.toDateString()}
                    </p>
                    <p>
                        <b>Is Sport Related: </b>
                        {props.isSportsRelated ? "Yes" : "No"}
                    </p>
                    <p>
                        <b>Event Type: </b>
                        {props.selectedEventType}
                    </p>
                    <p>
                        <b>Side Of Body: </b>
                        {props.selectedSideOfBody}
                    </p>
                    <p>
                        <b>Location On Body: </b>
                        {props.selectedLocationOnBody}
                    </p>
                    <p>
                        <b>Injury Type: </b>
                        {props.selectedInjuryType}
                    </p>
                    <p>
                        <b>Severity: </b>
                        {props.selectedSeverity}
                    </p>
                    <Divider light></Divider>
                    <p>
                        <b>Status: </b>
                        {props.selectedStatus}
                    </p>
                    <p>
                        <b>Mechanism Of Injury: </b>
                        {props.selectedMechanismOfInjury}
                    </p>
                    <Divider light></Divider>
                    <p>
                        <b>Injury Description: </b>
                        {props.injuryDescription}
                    </p>
                    <p>
                        <b>Other Notes: </b>
                        {props.otherNotes}
                    </p>
                </div>
            );
        default:
            return <></>;
    }
}
